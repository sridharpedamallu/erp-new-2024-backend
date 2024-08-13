'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tenant.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy', constraints: false });
      Tenant.belongsTo(models.User, { as: 'updator', foreignKey: 'updatedBy', constraints: false });

      Tenant.hasMany(models.Company, { foreignKey: 'tenantId', as: 'companies' });

    }
  }
  Tenant.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,

    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tenant',
    paranoid: true
  });
  return Tenant;
};