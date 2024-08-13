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
    await queryInterface.bulkInsert('Countries', [
      {
        countryCode: 'US',
        countryName: 'United States',
        tenantId: 1,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        countryCode: 'UK',
        countryName: 'United Kingdom',
        tenantId: 1,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        countryCode: 'FR',
        countryName: 'France',
        tenantId: 1,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        countryCode: 'IN',
        countryName: 'India',
        tenantId: 1,
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
  }
};
