'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.INTEGER
      },
      concept: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      typeId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName: 'Types'
          },
          key:'id'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName: 'Categories'
          },
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};