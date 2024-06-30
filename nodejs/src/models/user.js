"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Allcode, {
        foreignKey: "roleId",
        targetKey: "keyMap",
        as: "roleData",
      });
      // User.hasMany(models.Order, {
      //   foreignKey: "customerId",
      //   as: "customerData",
      // });
      // User.belongsTo(models.StaffRestaurantMap, {
      //   foreignKey: "id",
      //   targetKey: "staffId",
      // });
      User.hasMany(models.StaffRestaurantMap, { foreignKey: "id" });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      image: DataTypes.BLOB("long"),
      roleId: DataTypes.INTEGER,
      type_register: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
