"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      resDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      resTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      people: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      resStatus: {
        type: Sequelize.ENUM("pending", "seated", "confirmed", "done", "cancel"),
        allowNull: false,
        defaultValue: "pending",
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      depositAmount: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      totalAmount: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      paymentStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      refundedAmount: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
