'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Category,{
        as : 'category',
        foreignKey : 'categoryId'
      })
      Transaction.belongsTo(models.Type,{
        as : 'types',
        foreignKey : 'typeId'
      })
    }
  };
  Transaction.init({
    amount: DataTypes.INTEGER,
    notion: DataTypes.STRING,
    date: DataTypes.DATE,
    typeId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};