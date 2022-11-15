'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      balance: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }
    });
  },

  async down (queryInterface) {
     await queryInterface.dropTable('Accounts');
  }
};
