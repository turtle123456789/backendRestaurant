// services/comboService.js

const db = require("../models");

let getAllCombos = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let combos = await db.Combo.findAll({
        raw: true,
      });
      resolve({
        data: combos,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const createCombo = async (comboData) => {
  try {
    // Tạo combo
    const combo = await db.Combo.create({
      name: comboData.name,
      price: comboData.price,
      description: comboData.description,
    });

    // Tạo liên kết giữa combo và các dish
    if (comboData.dishIds && comboData.dishIds.length > 0) {
      await db.ComboDish.bulkCreate(
        comboData.dishIds.map((dishId) => ({
          comboId: combo.id,
          dishId: dishId,
        }))
      );
    }

    return { status: 200, message: "Combo created successfully", data: combo };
  } catch (error) {
    return { status: 500, message: "Error creating combo", error: error };
  }
};

const deleteCombo = async (comboId) => {
  try {
    // Kiểm tra xem combo có tồn tại không
    const combo = await db.Combo.findOne({ where: { id: comboId } });
    if (!combo) {
      return { status: 404, message: "Combo not found" };
    }

    // Xóa liên kết giữa combo và các dish trong bảng ComboDish
    await db.ComboDish.destroy({
      where: { comboId: comboId },
    });

    // Xóa combo
    await db.Combo.destroy({ where: { id: comboId } });

    return { status: 200, message: "Combo deleted successfully" };
  } catch (error) {
    console.error("Error deleting combo:", error);
    return { status: 500, message: "Error deleting combo" };
  }
};

let updateComboData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      }
      let combo = await db.Combo.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (combo) {
        combo.price = data.price;
        combo.description = data.description;
        await combo.save();
        resolve({
          status: 200,
          message: "Update the combo succeeds!",
          data: combo,
        });
      } else {
        resolve({
          status: 404,
          message: "combo is not exist",
          data: "",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createCombo,
  deleteCombo,
  getAllCombos,
  updateComboData,
};
