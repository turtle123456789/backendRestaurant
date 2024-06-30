import db from "../models/index";
const _ = require("lodash");

// let getAllRestaurants = (restaurantId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let restaurants = "";
//       if (restaurantId === "ALL") {
//         restaurants = await db.Restaurant.findAll({});
//       }
//       if (restaurantId && restaurantId !== "ALL") {
//         restaurants = await db.Restaurant.findOne({
//           where: { id: restaurantId },
//         });
//       }
//       resolve({ restaurants, data: restaurants });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let getAllRestaurants = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let restaurants = await db.Restaurant.findAll({
        where: { isDelete: "0" },
        attributes: [
          "id",
          "name",
          "address",
          "provinceId",
          "image",
          "latitude",
          "longitude",
          "isOpen",
        ],
      });
      resolve({
        status: 200,
        message: "OK",
        data: restaurants,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllTypeNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let typeNames = await db.Type.findAll({
        attributes: {
          exclude: ["image"],
        },
      });

      resolve({
        errCode: 0,
        data: typeNames,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let checkExistRestaurant = (address) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Restaurant.findOne({
        where: { address: address },
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

let createNewRestaurant = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExistRestaurant = await checkExistRestaurant(data.address);
      if (isExistRestaurant) {
        return resolve({
          status: 400,
          message: "Restaurant is exist, please enter other restaurant",
          data: "",
        });
      }
      let restaurant = await db.Restaurant.create({
        name: data.name,
        provinceId: data.provinceId,
        image: data.image,
        address: data.address,
        longitude: data.longitude,
        latitude: data.latitude,
        isOpen: 0,
        isDelete: "0",
      });
      resolve({
        status: 200,
        message: "OK",
        data: restaurant,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteRestaurant = (restaurantId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const restaurant = await db.Restaurant.findOne({
        where: { id: restaurantId },
        raw: false,
      });
      if (!restaurant) {
        return resolve({
          status: 404,
          message: "restaurant is not exist!",
          data: "",
        });
      } else {
        restaurant.isDelete = "1";
        restaurant.isOpen = "0";
        await restaurant.save();
        return resolve({
          status: 200,
          message: "Delete the table succeeds! (Restaurant still exists in db)",
          data: restaurant,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateRestaurantData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        return resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      }
      let restaurant = await db.Restaurant.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (restaurant) {
        for (let key in data) {
          if (key !== "id" && data[key] !== null) {
            restaurant[key] = data[key];
          }
        }
        await restaurant.save();
        return resolve({
          status: 200,
          message: "Update the restaurant succeeds!",
          data: restaurant,
        });
      } else {
        return resolve({
          status: 404,
          message: "Restaurant is not exist",
          data: "",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// let getAllCodeService = (typeInput) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!typeInput) {
//         resolve({
//           errCode: 1,
//           message: "Missing required parameter",
//         });
//       } else {
//         let res = {};
//         let allcode = await db.Allcode.findAll({
//           where: { type: typeInput },
//         });
//         res.errCode = 0;
//         res.data = allcode;
//         resolve(res);
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getTopRestaurant = (limitInput) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let restaurants = await db.Restaurant.findAll({
//         limit: limitInput,
//         order: [["createdAt", "DESC"]],
//       });
//       resolve({
//         status: 200,
//         data: restaurants,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let getDetailRestaurantById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        return resolve({
          status: 400,
          message: "Missing required parameter!",
          data: "",
        });
      } else {
        let data = await db.Restaurant.findOne({
          where: { id: inputId },
        });
        if (data) {
          return resolve({
            status: 200,
            message: "OK",
            data: data,
          });
        } else {
          return resolve({
            status: 404,
            message: "Restaurant is not exist",
            data: "",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

// let bulkCreateSchedule = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       console.log("Check data 1", data);
//       if (!data.arrSchedule || !data.restaurantId || !data.formatedDate) {
//         resolve({
//           errCode: 1,
//           message: "Missing reqiured parameter!",
//         });
//       } else {
//         let schedule = data.arrSchedule;
//         if (schedule && schedule.length > 0) {
//           schedule = schedule.map((item) => {
//             console.log("item:", item);
//             //item.maxNumber = MAX_NUMBER_SCHEDULE;
//             //item.date = new Date(item.date).getTime();
//             return item;
//           });
//         }
//         console.log("Data:", schedule);

//         //convert date
//         let existing = await db.Schedule.findAll({
//           where: { restaurantId: data.restaurantId, date: data.formatedDate },
//           attributes: ["restaurantId", "date", "timeType"],
//           raw: true,
//         });

//         // if (existing && existing.length > 0) {
//         //   existing = existing.map((item) => {
//         //     item.date = new Date(item.date).getTime();
//         //     return item;
//         //   });
//         // }

//         let toCreate = _.differenceWith(schedule, existing, (a, b) => {
//           return a.timeType === b.timeType && +a.date === +b.date;
//         });

//         console.log("check different: ", toCreate);

//         if (toCreate && toCreate.length > 0) {
//           await db.Schedule.bulkCreate(toCreate);
//         }
//         resolve({
//           errCode: 0,
//           message: "OK",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

//let getScheduleByDate = (restaurantId, date) => {};

// let getExtraInfoRestaurantById = (restaurantId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!restaurantId) {
//         resolve({
//           errCode: 1,
//           message: "Missing required parameter!",
//         });
//       } else {
//         let data = await db.Restaurant.findOne({
//           where: { id: restaurantId },
//           attributes: {
//             exclude: ["id", "restaurantId"],
//           },
//           include: [
//             {
//               model: db.Allcode,
//               as: "provinceData",
//               attributes: ["valueEn", "valueVi"],
//             },
//             {
//               model: db.Markdown,
//               attributes: ["description", "contentHTML", "contentMarkdown"],
//             },
//           ],
//           raw: false,
//           nest: true,
//         });

//         if (data && data.image) {
//           data.image = new Buffer(data.image, "base64").toString("binary");
//         }

//         if (!data) data = {};
//         resolve({
//           errCode: 0,
//           data: data,
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getProfileRestaurantById = (restaurantId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!restaurantId) {
//         resolve({
//           errCode: 1,
//           message: "Missing required parameter!",
//         });
//       } else {
//         let data = await db.Restaurant.findOne({
//           where: { id: restaurantId },
//           attributes: {
//             exclude: ["id", "restaurantId"],
//           },
//           include: [
//             {
//               model: db.Allcode,
//               as: "provinceData",
//               attributes: ["valueEn", "valueVi"],
//             },
//             { model: db.Type, attributes: ["name", "id"] },
//           ],
//           raw: false,
//           nest: true,
//         });

//         if (!data) data = {};
//         resolve({
//           errCode: 0,
//           data: data,
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let saveDetailInfoRestaurant = (inputData) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (
//         !inputData.restaurantId ||
//         !inputData.contentHTML ||
//         !inputData.contentMarkdown ||
//         !inputData.action
//       ) {
//         resolve({
//           errCode: 1,
//           message: "Missing parameter",
//         });
//       } else {
//         if (inputData.action === "CREATE") {
//           await db.Markdown.create({
//             contentHTML: inputData.contentHTML,
//             contentMarkdown: inputData.contentMarkdown,
//             description: inputData.description,
//             restaurantId: inputData.restaurantId,
//           });
//         } else if (inputData.action === "EDIT") {
//           let restaurantMarkdown = await db.Markdown.findOne({
//             where: { restaurantId: inputData.restaurantId },
//             raw: false,
//           });
//           if (restaurantMarkdown) {
//             restaurantMarkdown.contentHTML = inputData.contentHTML;
//             restaurantMarkdown.contentMarkdown = inputData.contentMarkdown;
//             restaurantMarkdown.description = inputData.description;
//             restaurantMarkdown.updateAt = new Date();

//             await restaurantMarkdown.save();
//           }
//         }

//         resolve({
//           errCode: 0,
//           message: "Save info restaurant succees!",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let getRestaurantByLocation = (location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!location) {
        resolve({
          status: 400,
          message: "Missing required parameter!",
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
        if (restaurants && restaurants.length != 0) {
          resolve({
            status: 200,
            message: "OK",
            data: restaurants,
          });
        } else {
          resolve({
            status: 200,
            message: "There is not any restaurant.",
            data: "",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewRestaurant: createNewRestaurant,
  deleteRestaurant: deleteRestaurant,
  updateRestaurantData: updateRestaurantData,
  getDetailRestaurantById: getDetailRestaurantById,
  getAllRestaurants: getAllRestaurants,
  getAllTypeNames: getAllTypeNames,
  getRestaurantByLocation: getRestaurantByLocation,
};
