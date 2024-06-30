import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewRestaurant = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Restaurant.create({
        name: data.name,
        address: data.address,
        phonenumber: data.phonenumber,
        priceId: data.priceId,
        provinceId: data.provinceId,
        typeId: data.typeId,
        restaurantId: data.restaurantId,
        note: data.note,
        staffId: data.staffId,
      });
      resolve("create new Restaurant succeed");
    } catch (e) {
      reject(e);
    }
  });
};

let getAllRestaurant = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let restaurants = await db.Restaurant.findAll({
        raw: true,
      });
      resolve(restaurants);
    } catch (e) {
      reject(e);
    }
  });
};

let getRestaurantInfoById = (restaurantId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let restaurant = await db.Restaurant.findOne({
        where: { id: restaurantId },
        raw: true,
      });

      if (restaurant) {
        resolve(restaurant);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateRestaurantData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let restaurant = await db.Restaurant.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (restaurant) {
        restaurant.name = data.name;
        restaurant.phonenumber = data.phonenumber;
        restaurant.provinceId = data.provinceId;
        restaurant.restaurantId = data.restaurantId;
        restaurant.typeId = data.typeId;
        restaurant.note = data.note;
        restaurant.priceId = data.priceId;

        await restaurant.save();

        let allRestaurants = await db.Restaurant.findAll();
        resolve(allRestaurants);
      } else {
        resolve();
      }
    } catch (e) {
      console.log(e);
    }
  });
};

let deleteRestaurantById = (restaurantId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletedRows = await db.Restaurant.destroy({
        where: { id: restaurantId },
      });

      if (deletedRows > 0) {
        // Có ít nhất một bản ghi đã bị xóa
        resolve();
      } else {
        // Không tìm thấy bản ghi để xóa
        reject(new Error("restaurant not found or already deleted"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewRestaurant: createNewRestaurant,
  getAllRestaurant: getAllRestaurant,
  getRestaurantInfoById: getRestaurantInfoById,
  updateRestaurantData: updateRestaurantData,
  deleteRestaurantById: deleteRestaurantById,
};
