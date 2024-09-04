'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TenantLoginSetup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TenantLoginSetup.init({
    tenantId: DataTypes.INTEGER,
    domainRestricted: DataTypes.BOOLEAN,
    clientLoginAccess: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TenantLoginSetup',
  });
  return TenantLoginSetup;
};