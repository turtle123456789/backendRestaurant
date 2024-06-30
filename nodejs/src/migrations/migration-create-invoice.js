"use strict";

const { Sequelize } = require("../models");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Invoices", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,

      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      received: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      change: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("deposit", "checkout", "refund"),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("waiting", "success", "failed"),
        allowNull: false,
        defaultValue: "waiting"
      }
      ,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable("Invoices");
  }
};
