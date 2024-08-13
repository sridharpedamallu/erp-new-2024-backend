'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
      currencyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Currencies', // The table name should be the pluralized version
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {  // Add deletedAt field
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};