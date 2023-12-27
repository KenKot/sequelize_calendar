"use strict";
const models = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = [];
    for (let i = 1; i < 11; i++) {
      users.push({
        fname: `bob ${i}`,
        lname: `smith ${i}`,
        username: `bobbysmith ${i}`,
        email: `bobsmith${i}@asdf.com`,
      });
    }
    return queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {}, models.User);
  },
};
