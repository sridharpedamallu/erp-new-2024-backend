'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ContactAddress.belongsTo(models.Tenant, { as: 'tenant', foreignKey: 'tenantId' });
      ContactAddress.belongsTo(models.Contact, { as: 'contact', foreignKey: 'contactId' });
      ContactAddress.belongsTo(models.City, { as: 'city', foreignKey: 'cityId' });
      ContactAddress.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
      ContactAddress.belongsTo(models.User, { as: 'updator', foreignKey: 'updatedBy' });
    }
  }
  ContactAddress.init({
    line1: DataTypes.STRING,
    line2: DataTypes.STRING,
    contactId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    isPrimaryAddress: DataTypes.BOOLEAN,
    tenantId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ContactAddress',
    paranoid: true
  });
  return ContactAddress;
};