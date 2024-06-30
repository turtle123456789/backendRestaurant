import db from "../models/index";
let bookTable = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.resTime ||
        !data.resDate ||
        !data.people ||
        !data.restaurantId ||
        !data.fullName ||
        !data.phoneNumber ||
        !data.email ||
        data.resTime === "" ||
        data.resDate === "" ||
        data.people === "" ||
        data.restaurantId === "" ||
        data.fullName === "" ||
        data.phoneNumber === "" ||
        data.email === ""
      ) {
        resolve({
          status: 400,
          message: "Missing required parameter!",
          data: "",
        });
      }
      let order;
      order = await db.Order.create({
        resStatus: "pending",
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        resDate: data.resDate,
        resTime: data.resTime,
        people: data.people,
        depositAmount: 0,
        restaurantId: data.restaurantId,
        email: data.email,
        cusId: data.id ?? null,
      });

      let totalDepositAmount = 0;
      for (let item of data.orderItemArray) {
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
      order.totalAmount = totalDepositAmount/0.3;
      await order.save();
      resolve({
        status: 201,
        message: "Book table successfully!",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// let bookTable = (tableId) => {
//   console.log("TableId", tableId);
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!tableId) {
//         resolve({
//           status: 400,
//           message: "Missing required parameter!",
//           data: "",
//         });
//       } else {
//         let table = await db.Table.findOne({
//           where: { id: tableId },
//         });
//         console.log("table", table);
//         let orderItems = [];
//         if (table) {
//           orderItems = await db.OrderItem.findAll({
//             where: { orderId: table.orderId },
//           });
//         }
//         let totalDepositAmount = 0;
//         for (let item of orderItems) {
//           let depositAmount = item.price * 0.3;
//           totalDepositAmount += depositAmount;
//         }

//         let order = await db.Order.findOne({
//           where: { id: table.orderId },
//           raw: false,
//         });
//         if (order) {
//           order.depositAmount = totalDepositAmount;
//           await order.save();
//         }

//         resolve({
//           data: order,
//           status: 201,
//           message: "Book table successfully!",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let createNewOrderItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dish = await db.Dish.findOne({
        where: { id: data.dishId },
        raw: false,
      });
      let price = dish.price * data.quantity;
      let orderItem = await db.OrderItem.create({
        orderId: data.orderId,
        dishId: data.dishId,
        quantity: data.quantity,
        price: price,
        status: "waiting",
        note: data.note,
      });
      resolve({
        status: 201,
        message: "OK",
        data: orderItem,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let customerPreOrderDish = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("DATA", data);
    try {
      if (!data.orderId || !data.dishId || !data.quantity || !data.price) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
        });
      } else {
        //upsert customer
        // let user = await db.User.findOrCreate({
        //   where: { email: data.email },
        //   defaults: {
        //     roleId: "3",
        //     email: data.email,
        //     firstName: data.firstName,
        //     lastName: data.lastName,
        //     phoneNumber: data.phoneNumber,
        //   },
        // });
        let dish = await db.Dish.findOne({
          where: { id: data.dishId },
        });

        let order = await db.Order.findOne({
          where: { id: data.orderId },
        });

        console.log("Dish: ", dish);
        console.log("Order: ", order);
        if (table) {
          await db.OrderItem.findOrCreate({
            where: { orderId: order.id },
            defaults: {
              status: 0,
              orderId: order.id,
              dishId: data.dishId,
              price: data.price,
              note: data.note,
            },
          });
        }
        resolve({
          data: user,
          errCode: 0,
          message: "Book table successfully!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  bookTable,
  createNewOrderItem,
  customerPreOrderDish,
};
