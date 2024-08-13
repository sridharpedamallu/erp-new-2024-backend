'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContactAddresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      line1: {
        type: Sequelize.STRING
      },
      line2: {
        type: Sequelize.STRING
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities', // The table name should be the pluralized version
          key: 'id'
        }
      },
      contactId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Contacts', // The table name should be the pluralized version
          key: 'id'
        }
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      isPrimaryAddress: {
        type: Sequelize.BOOLEAN
      },
      tenantId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tenants', // The table name should be the pluralized version
          key: 'id'
        }
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
    await queryInterface.dropTable('ContactAddresses');
  }
};