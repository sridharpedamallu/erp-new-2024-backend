'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BaseCountry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      BaseCountry.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
      BaseCountry.belongsTo(models.User, { as: 'updator', foreignKey: 'updatedBy' });
      BaseCountry.hasMany(models.City, { foreignKey: 'countryId', as: 'cities' });

    }
  }
  BaseCountry.init({
    countryCode: DataTypes.STRING,
    countryName: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BaseCountry',
    paranoid: true
  });
  return BaseCountry;
};