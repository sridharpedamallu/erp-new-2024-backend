'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Currency.belongsTo(models.Tenant, { as: 'tenant', foreignKey: 'tenantId' });

      Currency.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
      Currency.belongsTo(models.User, { as: 'updator', foreignKey: 'updatedBy' });

      Currency.hasMany(models.Company, { foreignKey: 'currencyId', as: 'companies' });

    }
  }
  Currency.init({
    currencyCode: DataTypes.STRING,
    currencyName: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    tenantId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Currency',
    paranoid: true

  });
  return Currency;
};