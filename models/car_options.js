"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class car_options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      car_options.belongsTo(models.car, { foreignKey: "id_car" });
      car_options.belongsTo(models.option, { foreignKey: "id_option" });
    }
  }
  car_options.init(
    {
      id_option: DataTypes.INTEGER,
      id_car: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "car_options",
      paranoid: true,
    }
  );
  return car_options;
};
