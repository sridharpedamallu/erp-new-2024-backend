'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.belongsTo(models.Tenant, { as: 'tenant', foreignKey: 'tenantId' });

      Contact.belongsTo(models.Company, { as: 'company', foreignKey: 'companyId' });
      Contact.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
      Contact.belongsTo(models.User, { as: 'updator', foreignKey: 'updatedBy' });

      Contact.hasMany(models.ContactAddress, { foreignKey: 'contactId', as: 'addresses' });

    }
  }

  Contact.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    tenantId: DataTypes.INTEGER,
    designation: DataTypes.STRING,
    isPrimaryContact: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN,

    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Contact',
    paranoid: true
  });
  return Contact;
};