"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Markdowns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      contentHTML: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },

      contentMarkdown: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },

      description: {
        allowNull: true,
        type: Sequelize.TEXT("long"),
      },

      dishId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },

      restaurantId: {
        allowNull: true,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Markdowns");
  },
};
