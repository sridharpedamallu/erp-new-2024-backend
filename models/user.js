'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Tenant, { as: 'tenant', foreignKey: 'tenantId' });

      User.hasMany(User, { as: 'createdUsers', foreignKey: 'createdBy' });
      User.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });

      User.hasMany(User, { as: 'updatedUsers', foreignKey: 'updatedBy' });
      User.belongsTo(User, { as: 'updator', foreignKey: 'updatedBy' });

    }
  }
  User.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    userType: DataTypes.INTEGER,
    tenantId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true
  });
  return User;
};