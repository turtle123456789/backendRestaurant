import db from "../models/index";
const { fn, col } = db.sequelize;
const Order = db.Order;
const User = db.User;
const Table = db.Table;
const { flattenArrayObjects } = require("../utils/flattenObject");

const findAllOrders = async () => {
  const orders = await Order.findAll({
    attributes: ["id", "resDate", "resTime", "resStatus", "people"],
    include: [
      {
        model: User,
        attributes: [
          [fn("CONCAT", col("firstName"), " ", col("lastName")), "name"],
          "email",
          "phone",
        ],
      },
    ],
  });
  return flattenArrayObjects(orders);
};

const findOrderById = async (orderId) => {
  const order = await Order.findOne({
    where: {
      id: orderId,
    },
  });
  return order;
};

const createCustomer = async (customerDetails, t = null) => {
  return await User.create(
    {
      firstName: customerDetails.firstName,
      lastName: customerDetails.lastName,
      phoneNumber: customerDetails.phoneNumber,
      email: customerDetails.email,
    },
    {
      transaction: t,
    }
  );
};

const createOrder = async (resDetails) => {
  const { resDate, resTime, people, ...customerDetails } = resDetails;
  const result = await db.sequelize.transaction(async (t) => {
    const customer = await createCustomer(customerDetails, t);

    const order = await Order.create(
      {
        resDate: resDate,
        resTime: resTime,
        people: people,
        customerId: customer.id,
      },
      { transaction: t }
    );

    return order;
  });
  return result;
};

const updateOrder = async (orderId, resDetails) => {
  const [result, metadata] = await Order.update(resDetails, {
    where: {
      id: orderId,
    },
  });

  return result;
};

const deleteOrder = async (order) => {
  return await order.destroy();
};

const setOrderStatus = async (order, status) => {
  order.resStatus = status;
  return await order.save();
};

const setOrderTable = async (orderId, tableId) => {
  await Table.update(
    {
      isOccupied: true,
      orderId: orderId,
    },
    {
      where: {
        id: tableId,
      },
    }
  );
  return await Order.update(
    {
      resStatus: "seated",
    },
    {
      where: {
        id: orderId,
      },
    }
  );
};

module.exports = {
  findAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  findOrderById,
  setOrderTable,
  setOrderStatus,
};
