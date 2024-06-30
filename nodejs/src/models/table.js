"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Table.belongsTo(models.Order, {
        onUpdate: "cascade",
        hooks: true,
      });
      Table.belongsTo(models.Restaurant, {
        onUpdate: "cascade",
        hooks: true,
      });
      Table.hasMany(models.OrderTable, {
        foreignKey: "tableId",
      });
    }
  }
  Table.init(
    {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
          async isUnique(value) {
            const table = await Table.findOne({
              where: {
                name: value,
              },
            });
            if (table) throw new Error("Table with this name already exists!");
          },
          notEmpty: {
            arg: true,
            msg: "Table name shouldn't be blank!",
          },
        },
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Capacity shouldn't be blank!",
          },
          isInt: {
            arg: true,
            msg: "Should be an integer value!",
          },
          min: {
            args: [1],
            msg: "One seat needed at least!",
          },
          max: {
            args: [8],
            msg: "Maximum 8 seats per table!",
          },
        },
      },
      isOccupied: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      position: {
        type: DataTypes.STRING,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
      },
      orderId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Table",
      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
      ],
    }
  );
  return Table;
};
