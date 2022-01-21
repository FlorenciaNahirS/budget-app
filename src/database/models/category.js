'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Transaction,{
        as : 'transactions',
        foreignKey : 'categoryId'
      })
      Category.belongsTo(models.Type,{
        as : 'type',
        foreignKey : 'typeId'
      })
    }
  };
  Category.init({
    name: DataTypes.STRING,
    typeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};