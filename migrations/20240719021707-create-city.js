'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      tenantId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tenants', // The table name should be the pluralized version
          key: 'id'
        }
      },
      countryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Countries', // The table name should be the pluralized version
          key: 'id'
        }
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // The table name should be the pluralized version
          key: 'id'
        }
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // The table name should be the pluralized version
          key: 'id'
        }
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cities');
  }
};