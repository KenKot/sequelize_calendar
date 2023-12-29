"use strict";
const models = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let events = [];
    const calendars = await models.Calendar.findAll(); // Retrieve all calendars

    // Create events for each calendar
    calendars.forEach((calendar) => {
      for (let i = 1; i <= 10; i++) {
        // Create 10 events for each calendar
        const date = new Date(); // Just as an example, using the current date
        events.push({
          name: `Event ${i} for ${calendar.name}`,
          description: `Description for event ${i}`,
          date: date,
          startTime: "10:00", // Replace with actual logic to determine start time
          endTime: "11:00", // Replace with actual logic to determine end time
          calendarId: calendar.id, // Foreign key linking to the calendar
          createdAt: new Date(),
          updatedAt: new Date(),
          // Add other event attributes as needed
        });
      }
    });

    return queryInterface.bulkInsert("Events", events);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface("Events", null, {}, models.Events);
  },
};
