"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   OrderItem.belongsTo(models.User, {
      //     foreignKey: "customerId",
      //     targetKey: "id",
      //     as: "customerData",
      //   });
      //   OrderItem.belongsTo(models.Table, {
      //     foreignKey: "tableId",
      //     targetKey: "id",
      //     as: "tableData",
      //   });
      OrderItem.belongsTo(models.Order, {
        foreignKey: "orderId",
        targetKey: "id",
      });
      OrderItem.hasOne(models.Dish, { foreignKey: "id" });
    }
  }
  OrderItem.init(
    {
      orderId: DataTypes.INTEGER,
      dishId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
