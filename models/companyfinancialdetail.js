'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyFinancialDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CompanyFinancialDetail.belongsTo(models.Tenant, { as: 'tenant', foreignKey: 'tenantId' });
      CompanyFinancialDetail.belongsTo(models.Company, { as: 'company', foreignKey: 'companyId' });
      CompanyFinancialDetail.belongsTo(models.User, { as: 'Creator', foreignKey: 'createdBy' });
      CompanyFinancialDetail.belongsTo(models.User, { as: 'Updator', foreignKey: 'updatedBy' });
    }
  }
  CompanyFinancialDetail.init({
    companyId: DataTypes.INTEGER,
    bankName: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    bankCode: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    tenantId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CompanyFinancialDetail',
    paranoid: true
  });
  return CompanyFinancialDetail;
};