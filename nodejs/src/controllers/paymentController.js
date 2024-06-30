const vnpService = require("../services/vnpService");
import db from "../models/index";

const handlePaymentWithVNP = async (req, res) => {
  try {
    if (req.body.type !== "deposit") {
      let order = await db.Order.findOne({
        where: {
          id: req.body.orderId,
        },
   
      });
      req.body.change =
        req.body.received - order.totalAmount + order.depositAmount;
      req.body.amount = order.totalAmount - order.depositAmount;
    }

    let data = await vnpService.createPaymentWithVNP(req);
    return res.json(data);
  } catch (e) {
    console.log(e);
    return res.json({
      status: 500,
      message: "Error from server...",
      data: "",
    });
  }
};

const handlePaymentResultWithVNP = async (req, res, io) => {
  try {
    let data = await vnpService.getReturn(req);
    if (data.status === 200) {
      io.emit("payment-res", {
        message: "success",
        orderId: data.orderId,
      });
      return res.render("paymentSuccess");
    } else {
      io.emit("payment-res", "fail"); // Emit event
      return res.render("paymentFailed");
    }
  } catch (e) {
    console.log(e);
    return res.json({
      status: 500,
      message: "Error from server...",
      data: "",
    });
  }
};

module.exports = {
  handlePaymentWithVNP,
  handlePaymentResultWithVNP,
};
