const express = require("express");
const router = express.Router();
const models = require("../models");
const Event = models.Event;
const Calendar = models.Calendar;

router.get("/", async (req, res) => {
  try {
    // const events = await Event.findAll({include: models.Calendar, limit: 100});
    const events = await Event.findAll({
      include: [
        {
          model: models.Calendar,
          include: [
            {
              model: models.User, // Make sure the Calendar model is associated with the User model
            },
          ],
        },
      ],
      order: [["id", "ASC"]], // Order by calendarId in ascending order
    });

    res.render("events/index", {events});
  } catch (error) {
    res.status(500).send("failed to get events");
  }
});

router.get("/new", async (req, res) => {
  try {
    const calendars = await Calendar.findAll();
    res.render("events/new", {calendars});
  } catch (error) {
    console.log(error);

    res.status(500).send("unable to create new event");
  }
});

router.post("/new", async (req, res) => {
  try {
    // const calendars = await Calendar.findAll();
    let eventParams = {
      name: req.body.name,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      calendarId: req.body.calendarId,
      description: req.body.description,
    };
    const newEvent = await Event.create(eventParams);
    res.redirect(`/events/${newEvent.id}`);
  } catch (error) {
    console.log(error);

    res.status(500).send("unable to create new event");
  }
});

//EDIT
router.get("/:id/edit", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: models.Calendar,
          include: [
            {
              model: models.User,
            },
          ],
        },
      ],
    });

    res.render("events/edit", {event});
  } catch (error) {
    res.status(500).send("Cant get event");
  }
});

router.post("/:id/edit", async (req, res) => {
  try {
    // const calendars = await Calendar.findAll();
    let eventParams = {
      name: req.body.name,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      description: req.body.description,
    };
    const event = await Event.findByPk(req.params.id);

    await event.update(eventParams);

    res.redirect(`/events/${event.id}`);
  } catch (error) {
    console.log(error);

    res.status(500).send("unable to update new event");
  }
});

router.get("/:id/delete", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    await event.destroy();
    res.redirect("/events");
  } catch (error) {
    console.log("event delete error: ", error);
    res.status(500).send("Cant delete");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: models.Calendar,
          include: [
            {
              model: models.User,
            },
          ],
        },
      ],
    });

    res.render("events/show", {event});
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(500).send("unable to show event");
  }
});

module.exports = router;
