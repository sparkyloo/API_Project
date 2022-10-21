'use strict';

/** @type {import('sequelize-cli')} */
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

    await queryInterface.bulkInsert('Memberships', [
      {
        "userId": 1,
        "groupId": 1,
        "status": "member"
      },
      {
        "userId": 2,
        "groupId": 1,
        "status": "co-host"
      },
      {
        "userId": 3,
        "groupId": 1,
        "status": "pending"
      }
    ], {});

    await queryInterface.bulkInsert('GroupImages', [
      {
        "groupId": 1,
        "url": "https://example.com",
        "preview": true
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
    await queryInterface.bulkDelete('Memberships', null, {});
    await queryInterface.bulkDelete('GroupImages', null, {});
  }
};
