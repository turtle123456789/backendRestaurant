"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ComboDishes", {
      comboId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Combos",
          key: "id",
        },
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
      },
      dishId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Dishes",
          key: "id",
        },
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ComboDishes");
  },
};
