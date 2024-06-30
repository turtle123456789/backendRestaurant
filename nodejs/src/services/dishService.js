import db from "../models/index";
const _ = require("lodash");
let getAllDishes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dishes = await db.Dish.findAll({
        raw: true,
      });
      resolve({
        data: dishes,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllDishNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dishNames = await db.Dish.findAll({
        attributes: {
          exclude: ["image"],
        },
      });

      resolve({
        status: 0,
        data: dishNames,
      });
      console.log("Type of dishnames:", typeof dishNames);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllDishCategoryNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dishCategoryNames = await db.Category.findAll({
        attributes: {
          exclude: ["image"],
        },
      });

      resolve({
        status: 0,
        data: dishCategoryNames,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let checkExistDish = (name, categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Dish.findOne({
        where: { categoryId: categoryId, name: name },
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

let createNewDish = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExistDish = await checkExistDish(data.name, data.categoryId);
      if (isExistDish) {
        return resolve({
          status: 400,
          message: "Dish is exist, please enter other dish",
          data: "",
        });
      }
      let dish = await db.Dish.create({
        name: data.name,
        price: data.price,
        categoryId: data.categoryId,
        description: data.description,
        image: data.image,
      });
      resolve({
        status: 201,
        message: "OK create",
        data: dish,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailDishById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          status: 400,
          message: "Missing required parameter!",
          data: "",
        });
      } else {
        let data = await db.Dish.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["dishId"],
          },
          include: [
            {
              model: db.Category,
              attributes: ["id", "name", "description"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (data) {
          resolve({
            status: 200,
            message: "OK",
            data: data,
          });
        } else {
          resolve({
            status: 404,
            message: "Dish is not exist",
            dish: "",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteDish = (dishId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dish = await db.Dish.findOne({
        where: { id: dishId },
      });
      if (!dish) {
        return resolve({
          status: 404,
          message: "dish is not exist!",
          data: "",
        });
      }
      await db.Dish.destroy({ where: { id: dishId } });
      return resolve({
        status: 200,
        message: "dish is deleted",
        data: "",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateDishData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      }
      let dish = await db.Dish.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (dish) {
        dish.description = data.description;
        dish.price = data.price;
        dish.image = data.image;
        dish.categoryId = data.categoryId;
        await dish.save();
        return resolve({
          status: 200,
          message: "Update the dish succeeds!",
          data: dish,
        });
      } else {
        return resolve({
          status: 404,
          message: "dish is not exist",
          data: "",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllDishes,
  getAllDishNames,
  getAllDishCategoryNames,
  createNewDish,
  getDetailDishById,
  deleteDish,
  updateDishData,
};
