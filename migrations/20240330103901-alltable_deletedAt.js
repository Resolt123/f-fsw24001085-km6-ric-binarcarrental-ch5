'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn("cars", "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE,
    });
   
    await queryInterface.addColumn("options", "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE,
    });

    await queryInterface.addColumn("specs", "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE,
    });

    await queryInterface.addColumn("car_options", "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("car_specs", "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
        await queryInterface.removeColumn("cars", "deletedAt");
        await queryInterface.removeColumn("options", "deletedAt");
        await queryInterface.removeColumn("specs", "deletedAt");
        await queryInterface.removeColumn("car_options", "deletedAt");
        await queryInterface.removeColumn("car_specs", "deletedAt");
  }
};
