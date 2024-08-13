'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.addConstraint('Tenants', {
    //   fields: ['createdBy'],
    //   type: 'foreign key',
    //   name: 'fk_tenants_createdBy',
    //   references: {
    //     table: 'Users',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });

    // await queryInterface.addConstraint('Tenants', {
    //   fields: ['updatedBy'],
    //   type: 'foreign key',
    //   name: 'fk_tenants_updatedBy',
    //   references: {
    //     table: 'Users',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // await queryInterface.removeConstraint('Tenants', 'fk_tenants_createdBy');
    // await queryInterface.removeConstraint('Tenants', 'fk_tenants_updatedBy');


  }
};
