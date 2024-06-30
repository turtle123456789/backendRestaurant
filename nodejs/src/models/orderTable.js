"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderTable.belongsTo(models.Table, { foreignKey: "tableId" });
      OrderTable.belongsTo(models.Order, {
        foreignKey: "orderId",
      });
    }
  }
  OrderTable.init(
    {
      tableId: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderTable",
    }
  );
  return OrderTable;
};
