import db from "../models/index";
import mailer from "./mailService";

const updateOrderStatus = async () => {
  const Op = db.Sequelize.Op;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

  let orders = await db.Order.findAll({
    where: {
      resDate: {
        [Op.lt]: currentDate, // resDate is before the current date
      },
      resStatus: {
        [Op.notIn]: ["done", "cancel"], // resStatus is not 'done' or 'cancel'
      },
    },
    raw: false,
  });

  for (let order of orders) {
    order.resStatus = "cancel";
    await order.save();
    if (order.email) await mailer.notifyOrderCanceled(order);
  }

  console.log("Update order status successfully");
};

const updateTable = async () => {
  let tables = await db.Table.findAll({ raw: false });
  for (let table of tables) {
    table.orderId = 0;
    await table.save();
  }
  console.log("Update table successfully");
};

module.exports = {
  updateOrderStatus,
  updateTable,
};
