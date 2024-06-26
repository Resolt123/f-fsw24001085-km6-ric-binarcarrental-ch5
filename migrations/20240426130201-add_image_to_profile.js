'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        await queryInterface.addColumn("users", "image", {
          allowNull: true,
          type: Sequelize.TEXT,
        });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "image");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
