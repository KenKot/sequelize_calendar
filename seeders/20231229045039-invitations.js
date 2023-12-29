"use strict";

const models = require("../models")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch all existing users and events
    const users = await models.User.findAll();
    const events = await models.Event.findAll();

    // Create an array to hold the invitation data
    let invitations = [];

    // Let's say we want to invite each user to each event
    users.forEach((user) => {
      events.forEach((event) => {
        invitations.push({
          userId: user.id, // ID of the user
          eventId: event.id, // ID of the event
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });

    // Bulk insert the invitations into the Invitations table
    return queryInterface.bulkInsert("Invitations", invitations);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(
      "Invitations",
      null,
      {},
      models.Invitation
    );
  },
};
