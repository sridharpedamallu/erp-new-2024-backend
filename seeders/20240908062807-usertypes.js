'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('UserTypes', [
      {
        userType: 'SalesRep',
        description: 'Sales Rep',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userType: 'SalesManager',
        description: 'Sales Manager',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userType: 'MarketingManager',
        description: 'Marketing Manager',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userType: 'CustomerServiceAgent',
        description: 'Customer Service Agent',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userType: 'CustomerServiceManager',
        description: 'Customer Service Manager',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userType: 'Fianance',
        description: 'Fianance',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userType: 'Leadership',
        description: 'Leadership',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userType: 'Vendor',
        description: 'Vendor',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userType: 'Admin',
        description: 'Admin',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('UserTypes', null, {});
  }
};
