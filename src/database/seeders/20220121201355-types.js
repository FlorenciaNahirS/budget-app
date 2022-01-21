'use strict';

const typesArr = ['earnings', 'expenses'];

const types = typesArr.map(type => {
  var t = {
    name : type,
    createdAt : new Date,
    updatedAt : null,
  }
  return t;
});


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Types', types, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Types', null, {});
  }
};