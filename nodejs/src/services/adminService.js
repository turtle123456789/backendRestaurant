import db from "../models/index";

const getAllStaff = () => {
  return new Promise(async (resolve, reject) => {
    try {
        let data = [];
      let staff = await db.User.findAll({
        where: { roleId: 2 },
        raw: true,
        attributes: [
          "id",
          "fullName",
          "email",
          "address",
          "phoneNumber",
          "image",
          "type_register",
          "createdAt",
          "updatedAt",
        ],
      });

      for (let i = 0; i < staff.length; i++) {
        let belong = await db.StaffRestaurantMap.findOne({
          where: { staffId: staff[i].id },
          raw: true,
          attributes: ["restaurantId"],
        });
        data.push({
          ...staff[i],
          restaurantId: belong ? belong.restaurantId : null,
        });
      }
      return resolve({
        status: 200,
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};



module.exports = {
  getAllStaff,
};
