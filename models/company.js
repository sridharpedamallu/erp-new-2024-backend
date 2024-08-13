'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.belongsTo(models.Tenant, { as: 'tenant', foreignKey: 'tenantId' });
      Company.belongsTo(models.Country, { as: 'country', foreignKey: 'countryId' });
      Company.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
      Company.belongsTo(models.User, { as: 'updator', foreignKey: 'updatedBy' });
      Company.belongsTo(models.Currency, { as: 'currency', foreignKey: 'currencyId' });

      Company.hasMany(models.Contact, { foreignKey: 'companyId', as: 'contacts' });
      Company.hasMany(models.CompanyFinancialDetail, { foreignKey: 'companyId', as: 'financials' });

    }
  }
  Company.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    countryId: DataTypes.INTEGER,
    tenantId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    currencyId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Company',
    paranoid: true
  });
  return Company;
};