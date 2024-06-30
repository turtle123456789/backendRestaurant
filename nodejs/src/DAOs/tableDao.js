import { where } from "sequelize";
import db from "../models/index";
const Table = db.Table;
const Order = db.Order;

const findAllTables = async () => {
  return await Table.findAll({
    include: [
      {
        model: Order,
      },
    ],
  });
};

const createTable = async ({ name, capacity }) => {
  return await Table.create({
    name: name,
    capacity: capacity,
  });
};

const findTableById = async (id) => {
  return await Table.findOne({
    where: {
      id: id,
    },
  });
};

let updateTableData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      }
      let table = await db.Table.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (table) {
        table.description = data.description;
        table.position = data.position;
        await table.save();
        resolve({
          status: 200,
          message: "Update the table succeeds!",
          data: table,
        });
      } else {
        resolve({
          status: 404,
          message: "Table is not exist",
          data: "",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateTable = async (tableId, payload) => {
  let table = await db.Table.findOne({
    where: { id: tableId },
    raw: false,
  });
  table.isOccupied = payload.isOccupied;
  table.orderId = payload.orderId;
  return await table.save();
};

const freeTable = async (orderDAO, table) => {
  const orderId = table.orderId;
  const order = await orderDAO.findOrderById(orderId);
  await updateTable(table.id, {
    isOccupied: false,
    orderId: null,
  });
  return await db.Order.destroy({ where: { id: orderId } });
};

module.exports = {
  findAllTables,
  createTable,
  findTableById,
  freeTable,
};
