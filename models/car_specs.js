"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class car_specs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      car_specs.belongsTo(models.car, { foreignKey: "id_car" });
      car_specs.belongsTo(models.spec, { foreignKey: "id_spec" });
    }
  }
  car_specs.init(
    {
      id_spec: DataTypes.INTEGER,
      id_car: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "car_specs",
      paranoid: true,
    }
  );
  return car_specs;
};
