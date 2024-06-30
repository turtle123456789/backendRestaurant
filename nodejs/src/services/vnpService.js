const e = require("express");
import db from "../models/index";
const shortUUID = require("short-uuid");
const moment = require("moment");
import mailer from "./mailService";

const tmnCode = process.env.VNP_TMN_CODE;

const secretKey = process.env.VNP_HASH_SECRET;

const returnUrl = process.env.VNP_RETURN_URL;

let createPaymentWithVNP = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      process.env.TZ = "Asia/Ho_Chi_Minh";
      if (req.body.type === "deposit") {
        let res = await createOrder(req.body.order);
        if (res.status !== 200) {
          return resolve(res);
        }
        req.body.orderId = res.order.id;
        req.body.change = 0;
        req.body.amount = res.order.depositAmount;
      }
      let invoice = await db.Invoice.create({
        id: shortUUID.generate(),
        orderId: req.body.orderId,
        received: req.body.received,
        type: req.body.type,
        change: req.body.change,
      });

      let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
      let date = new Date();
      let createDate = moment(date).format("YYYYMMDDHHmmss");

      let ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      let orderId = invoice.id;
      let amount = req.body.amount;
      let bankCode = req.body.bankCode;

      let locale = req.body.language;
      if (locale === null || locale === "") {
        locale = "vn";
      }
      let currCode = "VND";
      let vnp_Params = {};
      vnp_Params["vnp_Version"] = "2.1.0";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_TmnCode"] = tmnCode;
      vnp_Params["vnp_Locale"] = locale;
      vnp_Params["vnp_CurrCode"] = currCode;
      vnp_Params["vnp_TxnRef"] = orderId;
      vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
      vnp_Params["vnp_OrderType"] = "other";
      vnp_Params["vnp_Amount"] = amount * 100;
      vnp_Params["vnp_ReturnUrl"] = returnUrl;
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;
      if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
      }

      vnp_Params = sortObject(vnp_Params);

      let querystring = require("qs");
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

      resolve({
        status: 200,
        message: "success",
        data: vnpUrl,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getReturn = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let vnp_Params = req.query;

      let secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      vnp_Params = sortObject(vnp_Params);
      console.log("🚀 ~ returnnewPromise ~ vnp_Params:", vnp_Params);
      let querystring = require("qs");
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

      if (secureHash === signed) {
        let invoice = await db.Invoice.findOne({
          where: { id: vnp_Params["vnp_TxnRef"] },
          raw: false,
        });
        if (!invoice) {
          resolve({
            status: 404,
            message: "Order is not exist",
            data: "",
          });
        }

        console.log("🚀 ~ returnnewPromise ~ invoice:", invoice);
        let order = await db.Order.findOne({
          where: { id: invoice.orderId },
          raw: false,
        });
        console.log("🚀 ~ returnnewPromise ~ order:", order);
        if (
          invoice.type === "deposit" &&
          invoice.received !== vnp_Params["vnp_Amount"] / 100
        ) {
          resolve({
            status: 400,
            message: "Amount is not match",
            data: "",
          });
        }

        if (
          invoice.type === "checkout" &&
          order.totalAmount - order.depositAmount !==
            vnp_Params["vnp_Amount"] / 100
        ) {
          resolve({
            status: 400,
            message: "Amount is not match",
            data: "",
          });
        }

        if (vnp_Params["vnp_ResponseCode"] == "00") {
          if (invoice.type === "deposit") {
            order.paymentStatus = "deposited";
            order.resStatus = "confirmed";
            await order.save();
            console.log("update order status");
          }
          if (invoice.type === "checkout") {
            order.paymentStatus = "paid";
            order.resStatus = "done";
            await order.save();
          }
          if (invoice.type === "refund") {
            order.paymentStatus = "refunded";
            order.resStatus = "cancel";
            await order.save();
          }
          invoice.status = "success";
          await mailer.notifyOrderPlaceSuccess(order);
          console.log("update invoice status");
          await invoice.save();
          resolve({
            status: 200,
            message: "success",
            orderId: order.id,
          });
        } else {
          if (invoice.type === "deposit") {
            await db.Order.destroy({
              where: { id: invoice.orderId },
            });
            await db.OrderItem.destroyAll({
              where: { orderId: invoice.orderId },
            });
          }
          invoice.status = "failed";
          await invoice.save();
          resolve({
            status: 400,
            message: "Payment failed",
          });
        }
      } else {
        reject("Invalid signature");
      }
    } catch (e) {
      reject(e);
    }
  });
};

const vnpayIPN = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let vnp_Params = req.query;

      let secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      vnp_Params = sortObject(vnp_Params);

      let config = require("config");
      let tmnCode = config.get("vnp_TmnCode");
      let secretKey = config.get("vnp_HashSecret");

      let querystring = require("qs");
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

      if (secureHash === signed) {
        res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
      } else {
        res.render("success", { code: "97" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

async function createOrder(data) {
  try {
    if (
      !data.order.resTime ||
      !data.order.resDate ||
      !data.order.people ||
      !data.order.restaurantId ||
      !data.order.fullName ||
      !data.order.phoneNumber ||
      !data.order.email ||
      data.order.resTime === "" ||
      data.order.resDate === "" ||
      data.order.people === "" ||
      data.order.restaurantId === "" ||
      data.order.fullName === "" ||
      data.order.phoneNumber === "" ||
      data.order.email === ""
    ) {
      return {
        status: 400,
        message: "Missing required parameter!",
      };
    }
    let order;
    order = await db.Order.create({
      resStatus: "pending",
      fullName: data.order.fullName,
      phoneNumber: data.order.phoneNumber,
      resDate: data.order.resDate,
      resTime: data.order.resTime,
      people: data.order.people,
      depositAmount: 0,
      restaurantId: data.order.restaurantId,
      email: data.order.email,
      cusId: data.order.cusId ?? null,
    });

    let totalDepositAmount = 0;

    for (let item of data.orderItems) {
      let dish = await db.Dish.findOne({
        where: { id: item.dishId },
        raw: false,
      });
      let price = dish.price * item.quantity;
      let depositAmount = price * 0.3;
      totalDepositAmount += depositAmount;
      await db.OrderItem.create({
        orderId: order.id,
        dishId: item.dishId,
        quantity: item.quantity,
        price: price,
        status: "waiting",
        note: item.note,
      });
    }
    order.depositAmount = totalDepositAmount;
    order.totalAmount = totalDepositAmount / 0.3;
    await order.save();
    return {
      status: 200,
      message: "success",
      order: order,
    };
  } catch (error) {
    if (order) {
      await db.Order.destroy({
        where: { id: order.id },
      });
    }
    return {
      status: 500,
      message: "Error from server...",
    };
  }
}
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

module.exports = {
  createPaymentWithVNP,
  getReturn,
};
