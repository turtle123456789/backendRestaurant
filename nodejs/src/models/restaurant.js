"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurant.belongsTo(models.Allcode, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "provinceData",
      });
      Restaurant.hasOne(models.Markdown, { foreignKey: "restaurantId" });
      Restaurant.hasMany(models.Table, {
        onUpdate: "cascade",
        hooks: true,
      });
      //Restaurant.belongsTo(models.StaffRestaurantMap, { foreignKey: "id" });
      Restaurant.hasMany(models.StaffRestaurantMap, {
        foreignKey: "restaurantId",
      });
      Restaurant.hasMany(models.Order, {
        foreignKey: "restaurantId",
        as: "restaurantData",
      });
    }
  }
  Restaurant.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.BLOB("long"),
      },
      provinceId: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.TEXT,
      },
      longitude: {
        type: DataTypes.DOUBLE,
      },
      latitude: {
        type: DataTypes.DOUBLE,
      },
      isOpen: {
        type: DataTypes.INTEGER,
      },
      rate: {
        type: DataTypes.DOUBLE,
      },
      isDelete: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );
  return Restaurant;
};
