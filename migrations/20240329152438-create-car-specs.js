"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("car_specs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_spec: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "specs",
          },
          key: "id",
        },
      },
      id_car: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "cars",
          },
          key: "id",
        },
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
    await queryInterface.dropTable("car_specs");
  },
};
