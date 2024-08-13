'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      City.belongsTo(models.Tenant, { as: 'tenant', foreignKey: 'tenantId' });
      City.belongsTo(models.Country, { as: 'country', foreignKey: 'countryId' });
      City.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
      City.belongsTo(models.User, { as: 'updator', foreignKey: 'updatedBy' });
      City.hasMany(models.ContactAddress, { foreignKey: 'cityId', as: 'contactAddresses' });

    }
  }
  City.init({
    city: DataTypes.STRING,
    countryId: DataTypes.INTEGER,
    tenantId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'City',
    paranoid: true
  });
  return City;
};