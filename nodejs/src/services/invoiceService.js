import { Model, where } from "sequelize";
import db from "../models/index";
const _ = require("lodash");
const shortUUID = require("short-uuid");

const createInvoice = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let invoice = await db.Invoice.create({
        id: shortUUID.generate(),
        orderId: data.orderId,
        received: data.received,
        type: data.type,
        change: data.change,
      });
      resolve({
        status: 201,
        message: "OK create",
        data: invoice,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createInvoice,
};
