import { some } from "lodash";
import db from "../models/index";

let getListCustomerForStaff = (staffId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!staffId || !date) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
        });
      } else {
        let res = await db.Restaurant.findOne({
          where: { staffId: staffId },
          attributes: ["id"],
        });
        let restaurantId = res.id;
        let data = await db.Booking.findAll({
          where: {
            statusId: "S2",
            restaurantId: restaurantId,
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "customerData",
              attributes: ["email", "fullName", "phonenumber"],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataBooking",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        resolve({
          data: data,
          errCode: 0,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getRestaurantByStaffId = (staffId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!staffId) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!",
        });
      } else {
        let data = await db.Restaurant.findOne({
          where: { staffId: staffId },
          attributes: {
            exclude: ["image"],
          },
          include: [
            // {
            //   model: db.Allcode,
            //   as: "priceData",
            //   attributes: ["valueEn", "valueVi"],
            // },
            // {
            //   model: db.Allcode,
            //   as: "provinceData",
            //   attributes: ["valueEn", "valueVi"],
            // },
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            // {
            //   model: db.Restaurant,
            //   attributes: ["name", "address"],
            // },
            // {
            //   model: db.Type,
            //   attributes: ["name"],
            // },
          ],
          raw: false,
          nest: true,
        });

        if (data) {
          let dishRestaurant = [];
          dishRestaurant = await db.Dish.findAll({
            where: { restaurantId: data.id },
            attributes: {
              exclude: ["image"],
            },
          });

          data.setDataValue("dishRestaurant", dishRestaurant);
        }

        if (!data) data = {};

        resolve({
          errCode: 0,
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getListCustomerForStaff,
  getRestaurantByStaffId,
};
