"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StaffRestaurantMap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   StaffRestaurantMap.belongsTo(models.User, {
      //     foreignKey: "customerId",
      //     targetKey: "id",
      //     as: "customerData",
      //   });
      //   StaffRestaurantMap.belongsTo(models.Table, {
      //     foreignKey: "tableId",
      //     targetKey: "id",
      //     as: "tableData",
      //   });
      //   StaffRestaurantMap.belongsTo(models.Order, {
      //     foreignKey: "orderId",
      //     targetKey: "id",
      //   });
      // StaffRestaurantMap.hasOne(models.Restaurant, { foreignKey: "id" });
      // StaffRestaurantMap.hasMany(models.User, {
      //   onUpdate: "cascade",
      //   hooks: true,
      // });
      StaffRestaurantMap.belongsTo(models.User, { foreignKey: "id" });
      StaffRestaurantMap.belongsTo(models.Restaurant, {
        foreignKey: "restaurantId",
      });
    }
  }
  StaffRestaurantMap.init(
    {
      staffId: DataTypes.INTEGER,
      restaurantId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "StaffRestaurantMap",
    }
  );
  return StaffRestaurantMap;
};
