'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Alice Johnson',
        phone: '555-1234',
        email: 'alice.johnson@example.com',
        tenantId: 1,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        userType: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bob Smith',
        phone: '555-5678',
        email: 'bob.smith@example.com',
        tenantId: 1,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        userType: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Charlie Brown',
        phone: '555-8765',
        email: 'charlie.brown@example.com',
        tenantId: 1,
        isActive: false,
        createdBy: 1,
        updatedBy: 1,
        userType: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Diana Prince',
        phone: '555-4321',
        email: 'diana.prince@example.com',
        tenantId: 1,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        userType: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Eve Adams',
        phone: '555-1111',
        email: 'eve.adams@example.com',
        tenantId: 1,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        userType: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Frank Miller',
        phone: '555-2222',
        email: 'frank.miller@example.com',
        tenantId: 1,
        isActive: false,
        createdBy: 1,
        updatedBy: 1,
        userType: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Grace Hopper',
        phone: '555-3333',
        email: 'grace.hopper@example.com',
        tenantId: 1,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        userType: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Henry Ford',
        phone: '555-4444',
        email: 'henry.ford@example.com',
        tenantId: 1,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        userType: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Irene Adler',
        phone: '555-5555',
        email: 'irene.adler@example.com',
        tenantId: 1,
        isActive: false,
        createdBy: 1,
        updatedBy: 1,
        userType: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jack Ryan',
        phone: '555-6666',
        email: 'jack.ryan@example.com',
        tenantId: 1,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        userType: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

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
