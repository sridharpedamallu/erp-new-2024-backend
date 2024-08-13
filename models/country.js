'use strict';
const { Model } = require('sequelize');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Country.belongsTo(models.Tenant, { as: 'tenant', foreignKey: 'tenantId' });

      Country.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
      Country.belongsTo(models.User, { as: 'updator', foreignKey: 'updatedBy' });
      Country.hasMany(models.City, { foreignKey: 'countryId', as: 'cities' });
      Country.hasMany(models.Company, { foreignKey: 'countryId', as: 'companies' });

    }
  }
  Country.init({
    countryCode: DataTypes.STRING,
    countryName: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    tenantId: DataTypes.INTEGER,

    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Country',
    paranoid: true
  });
  return Country;
};