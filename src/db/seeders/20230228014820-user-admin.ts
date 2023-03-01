'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: any, Sequelize: any) {
    await queryInterface.bulkInsert('users', [{
      name:'Administrator User',
      email:'admin@w.com',
      password:'$2b$10$fUObHVM9mZB/9pgP8jcJqeJCKEqKtkQn0n3DAmMPDBBvjh6KiFqoS',
      balance:1000000,
      role:'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface: any, Sequelize: any) {
    await queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
