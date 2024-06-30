"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
      Invoice.belongsTo(models.Order, {
        foreignKey: "orderId",
        targetKey: "id",
      });
    }
  }

  Invoice.init(
    {
      received: {
        type: DataTypes.DOUBLE,
      },
      change: {
        type: DataTypes.DOUBLE,
      },
      type: {
        type: DataTypes.ENUM("deposit", "checkout", "refund"),
      },
      status: {
        type: DataTypes.ENUM("waiting", "success", "failed"),
        defaultValue: "waiting",
      },
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};
