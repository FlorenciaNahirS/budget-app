'use strict';

const categories = [
  {
    name : 'bills',
    typeId: 2,
    createdAt : new Date,
    updatedAt : null,
  },
  {
    name : 'clothes',
    typeId: 2,
    createdAt : new Date,
    updatedAt : null,
  },
  {
    name : 'entertaiment',
    typeId: 2,
    createdAt : new Date,
    updatedAt : null,
  },
  {
    name : 'groceries',
    typeId: 2,
    createdAt : new Date,
    updatedAt : null,
  },
  {
    name : 'health',
    typeId: 2,
    createdAt : new Date,
    updatedAt : null,
  },
  {
    name : 'pets',
    typeId: 2,
    createdAt : new Date,
    updatedAt : null,
  },
  {
    name : 'transportation',
    typeId: 2,
    createdAt : new Date,
    updatedAt : null,
  },
  {
    name : 'other',
    typeId: 2,
    createdAt : new Date,
    updatedAt : null,
  },
  {
    name : 'gift',
    typeId: 1,
    createdAt : new Date,
    updatedAt : null,
  },
  {
    name : 'salary',
    typeId: 1,
    createdAt : new Date,
    updatedAt : null,
  },
  {
    name : 'transfer',
    typeId: 1,
    createdAt : new Date,
    updatedAt : null,
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};