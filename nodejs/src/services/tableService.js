import db from "../models/index";
const { Op } = require("sequelize");
const moment = require("moment");

let getAllTables = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let tables = await db.Table.findAll({
        raw: true,
      });
      resolve({
        data: tables,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let checkExistTable = (name, restaurantId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Table.findOne({
        where: { name: name, restaurantId },
      });
      if (res) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewTable = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExistTable = await checkExistTable(data.name, data.restaurantId);
      if (isExistTable) {
        return resolve({
          status: 400,
          message: "Table name is exist, please enter other table",
          data: "",
        });
      }
      let table = await db.Table.create({
        name: data.name,
        capacity: data.capacity,
        position: data.position,
        description: data.description,
        orderId: 0,
        restaurantId: data.restaurantId,
      });
      return resolve({
        status: 201,
        message: "OK",
        data: table,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteTable = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const table = await db.Table.findOne({
        where: { id: data.id },
      });
      if (!table) {
        return resolve({
          status: 404,
          message: "table is not exist!",
          data: "",
        });
      }
      if (table.orderId !== 0) {
        return resolve({
          status: 400,
          message: "Table is in used, can not delete!",
          data: "",
        });
      }
      await db.Table.destroy({ where: { id: data.id } });
      return resolve({
        status: 200,
        message: "table is deleted",
        data: "",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllTablesByRestaurantId = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.restaurantId) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      }
      let tables = await db.Table.findAll({
        where: { restaurantId: data.restaurantId },
        raw: true,
      });
      resolve({
        status: 200,
        message: "OK",
        data: tables,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateTableData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        return resolve({
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
        for (let key in data) {
          if (key !== "id") {
            table[key] = data[key];
          }
        }
        await table.save();
        return resolve({
          status: 200,
          message: "Update the table succeeds!",
          table: table,
        });
      } else {
        return resolve({
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

let getDetailTableById = (tableId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!tableId) {
        resolve({
          status: 400,
          message: "Missing required parameter!",
          data: "",
        });
      } else {
        let table = await db.Table.findOne({
          where: { id: tableId },
        });

        if (table) {
          resolve({
            status: 200,
            message: "OK",
            data: table,
          });
        } else {
          resolve({
            status: 404,
            message: "Table is not exist",
            data: "",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const freeTable = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.orderId) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      } else {
        // Tìm các bàn có orderId trùng với tham số orderId
        // let tables = await db.Table.findAll({ where: { orderId: orderId } });

        // // Kiểm tra nếu không tìm thấy bàn nào thì trả về lỗi 404
        // if (!tables || tables.length === 0) {
        //   throw {
        //     status: 404,
        //     message: "Restaurant table not found!",
        //   };
        // }

        // Update orderId của từng bàn thành 0
        // const updatePromises = tables.map(async (table) => {
        //   await db.Table.update({ orderId: 0 }, { where: { id: table.id } });
        // });

        let tables = await db.Table.update(
          { orderId: 0 },
          { where: { orderId: data.orderId } }
        );
        console.log("🚀 ~ returnnewPromise ~ orderId:", data.orderId);

        console.log("TABLE", tables);

        // Chờ cho tất cả các promise update hoàn thành
        //await Promise.all(updatePromises);

        // Resolve với thông báo thành công
        resolve({
          status: 200,
          message: "Successfully freed the chosen table",
          data: "",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let searchTable = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.people || !data.resDate || !data.resTime) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      } else {
        let restaurants = [];
        if (location === "ALL") {
          restaurants = await db.Restaurant.findAll({});
        } else {
          //find by location
          restaurants = await db.Restaurant.findAll({
            where: { provinceId: location },
          });
        }

        resolve({
          errCode: 0,
          message: "OK",
          data: restaurants,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

function addHours(timeString, hours) {
  const [hoursStr, minutesStr, secondsStr] = timeString.split(":");
  const hoursToAdd = parseInt(hoursStr) + hours;
  return `${hoursToAdd}:${minutesStr}:${secondsStr}`;
}
function substractHours(timeString, hours) {
  const [hoursStr, minutesStr, secondsStr] = timeString.split(":");
  const hoursToAdd = parseInt(hoursStr) - hours;
  return `${hoursToAdd}:${minutesStr}:${secondsStr}`;
}

async function searchAvailableTables(data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.resDate ||
        !data.resTime ||
        !data.people ||
        !data.restaurantId
      ) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      }
      let resTime = moment(data.resTime, "HH:mm:ss");
      const startTime = resTime.clone().subtract(2, "hours").format("HH:mm:ss");
      const endTime = resTime.clone().add(2, "hours").format("HH:mm:ss");
      // Lấy danh sách các bàn đã được đặt trong khoảng thời gian yêu cầu
      const orders = await db.Order.findAll({
        where: {
          resDate: data.resDate,
          restaurantId: data.restaurantId,
          resTime: {
            [Op.between]: [startTime, endTime], // Thêm 2 giờ để tính toán thời gian kết thúc
          },
          [Op.or]: [
            { resStatus: "seated" },
            { resStatus: "pending" }, // Thêm trạng thái pending
            { resStatus: "confirmed" }, // Thêm trạng thái confirmed
            // Thêm các trạng thái khác nếu cần
          ],
        },
        raw: false,
        nest: true, // Include để lấy thông tin về bàn
      });
      let bookedTables = [];
      for (let item of orders) {
        let table = await db.OrderTable.findAll({
          where: { orderId: item.id },
        });
        table.map((t) => bookedTables.push(t.tableId));
      }

      const allTables = await db.Table.findAll({
        where: { restaurantId: data.restaurantId },
      });
      let availableTables = [];
      for (let i = 0; i < allTables.length; i++) {
        if (bookedTables.findIndex((e) => e === allTables[i].id) !== -1)
          continue;
        availableTables.push(allTables[i]);
      }
      resolve({
        status: 200,
        message: "Search tables successfully!",
        data: availableTables,
      });
    } catch (e) {
      reject(e);
    }
  });
}

const getAvailableTables = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.restaurantId || !data.people) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      }

      let tables = await db.Table.findAll({
        where: {
          restaurantId: data.restaurantId,
          orderId: 0,
        },
        raw: true,
      });
      if (data.orderId) {
        let tmp = await db.Table.findAll({
          where: {
            restaurantId: data.restaurantId,
            orderId: data.orderId,
          },
          raw: true,
        });
        tables = tables.concat(tmp);
        tables.sort((a, b) => a.id - b.id);
      }

      let availableTables = [];

      for (let table of tables) {
        if (table.capacity == data.people) {
          availableTables.push(table);
        }
      }

      resolve({
        status: 200,
        message: "OK",
        data: availableTables,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllTables,
  createNewTable,
  deleteTable,
  updateTableData,
  getDetailTableById,
  freeTable,
  searchTable,
  searchAvailableTables,
  getAllTablesByRestaurantId,
  getAvailableTables,
};
