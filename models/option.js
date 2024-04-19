"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      option.hasMany(models.car_options, { foreignKey: "id_option" });
    }
  }
  option.init(
    {
      type_option: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "option",
      paranoid: true,
    }
  );
  return option;
};
