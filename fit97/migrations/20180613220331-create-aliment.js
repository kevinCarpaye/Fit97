'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('aliments', {
      id_aliment: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      famille: {
        type: Sequelize.STRING
      },
      aliment: {
        type: Sequelize.STRING
      },
      calorie: {
        type: Sequelize.INTEGER
      },
      proteine: {
        type: Sequelize.DOUBLE
      },
      glucide: {
        type: Sequelize.DOUBLE
      },
      lipide: {
        type: Sequelize.DOUBLE
      },
      quantite: {
        type: Sequelize.DOUBLE
      },
      unite: {
        type: Sequelize.STRING
      },
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('aliments');
  }
};