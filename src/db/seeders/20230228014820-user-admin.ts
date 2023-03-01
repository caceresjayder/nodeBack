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
    },{
      name:'User One',
      email:'user1@w.com',
      password:'$2b$10$MMXJszIWk4zm/.cPMoS26eNPvm1i9yH/dKyxqgmAUG0eZJqBT7Bh6',
      balance:1000,
      role:'USER',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name:'User Two',
      email:'user2@w.com',
      password:'$2b$10$MMXJszIWk4zm/.cPMoS26eNPvm1i9yH/dKyxqgmAUG0eZJqBT7Bh6',
      balance:1000,
      role:'USER',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name:'User Three',
      email:'user3@w.com',
      password:'$2b$10$MMXJszIWk4zm/.cPMoS26eNPvm1i9yH/dKyxqgmAUG0eZJqBT7Bh6',
      balance:1000,
      role:'USER',
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
