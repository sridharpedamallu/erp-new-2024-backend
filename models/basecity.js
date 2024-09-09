'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BaseCity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BaseCity.belongsTo(models.Country, { as: 'country', foreignKey: 'countryId' });
      BaseCity.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
      BaseCity.belongsTo(models.User, { as: 'updator', foreignKey: 'updatedBy' });
    }
  }
  BaseCity.init({
    city: DataTypes.STRING,
    countryId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BaseCity',
    paranoid: true
  });
  return BaseCity;
};