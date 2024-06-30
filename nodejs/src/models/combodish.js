"use strict";
module.exports = (sequelize, DataTypes) => {
  const ComboDish = sequelize.define("ComboDish", {
    comboId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Combos",
        key: "id",
      },
    },
    dishId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Dishes",
        key: "id",
      },
    },
  });
  return ComboDish;
};
