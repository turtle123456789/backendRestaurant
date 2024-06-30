import db from "../models/index";
let createType = async (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("CHECK DATA type", data);
    try {
      if (!data.name || !data.description) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
        });
      } else {
        await db.Type.create({
          name: data.name,
          description: data.description,
        });
        resolve({
          errCode: 0,
          message: "Create new type succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllTypes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Type.findAll();
      if (data && data.length > 0) {
        console.log("data:", data);
      }
      resolve({
        errCode: 0,
        message: "OK",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailTypeById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
        });
      } else {
        let data = await db.Type.findOne({
          where: { id: inputId },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
        });
        if (data) {
          let restaurantType = [];
          if (location === "ALL") {
            restaurantType = await db.Restaurant.findAll({
              where: { typeId: inputId },
              attributes: ["id", "provinceId"],
            });
          } else {
            //find by location
            restaurantType = await db.Restaurant.findAll({
              where: { typeId: inputId, provinceId: location },
              attributes: ["id", "provinceId"],
            });
          }

          data.restaurantType = restaurantType;
        } else {
          data = "linh";
        }
        resolve({
          errCode: 0,
          message: "OK",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createType: createType,
  getAllTypes: getAllTypes,
  getDetailTypeById: getDetailTypeById,
};
