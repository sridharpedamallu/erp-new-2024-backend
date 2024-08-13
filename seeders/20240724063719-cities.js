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
    await queryInterface.bulkInsert('Cities', [
      {
        city: 'New York',
        countryId: 1,
        tenantId: 1,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: 'California',
        countryId: 1,
        tenantId: 1,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: 'London',
        countryId: 2,
        tenantId: 1,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: 'Leeds',
        countryId: 2,
        tenantId: 1,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: 'Hyderabad',
        countryId: 4,
        tenantId: 1,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: 'Bangalore',
        countryId: 4,
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
