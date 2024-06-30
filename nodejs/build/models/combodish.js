"use strict";

module.exports = function (sequelize, DataTypes) {
  var ComboDish = sequelize.define("ComboDish", {
    comboId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Combos",
        key: "id"
      }
    },
    dishId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Dishes",
        key: "id"
      }
    }
  });
  return ComboDish;
};