"use strict";
const models = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let calendars = [];
    const users = await models.User.findAll(); // Retrieve all users

    // Create calendars for each user
    users.forEach((user) => {
      for (let i = 1; i <= 5; i++) {
        // Create 5 calendars for each user
        calendars.push({
          userId: user.id,
          name: `Calendar ${i} for ${user.fname} ${user.lname}`,
          // Add other calendar attributes as needed
        });
      }
    });

    return queryInterface.bulkInsert("Calendars", calendars);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Calendars", null, {}, models.Calendar);
  },
};
