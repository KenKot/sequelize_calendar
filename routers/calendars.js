const express = require("express");
const router = express.Router();

const models = require("../models");
const Calendar = models.Calendar;
const User = models.User;

router.get("/", async (req, res) => {
  try {
    const calendars = await Calendar.findAll({include: models.User});
    res.render("calendars/index", {calendars});
  } catch (error) {
    res.status(500).send("Unable to get calendars", error);
  }
});

router.get("/new", async (req, res) => {
  res.render("calendars/new");
});

router.post("/new", async (req, res) => {
  const {calendar_name, username} = req.body;

  try {
    const user = await User.findOne({where: {username: username}});

    if (!user) return res.status(404).send("user not found");
    const newCalendar = await Calendar.create({
      name: calendar_name,
      userId: user.id,
    });
    res.redirect(`/calendars/${newCalendar.id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Unable to create calendar");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const calendar = await Calendar.findByPk(req.params.id);

    res.render("calendars/edit", {calendar});
  } catch (error) {
    console.log("edit error: ", error);
    res.status(500).send("error Unable to show edit");
  }
});

router.post("/:id/edit", async (req, res) => {
  console.log(".post fired");
  try {
    const calendar = await Calendar.findByPk(req.params.id);

    if (!calendar) return res.status(404).send("couldnt update");
    const updatedCalendar = await calendar.update({
      name: req.body.calendar_name,
    });

    res.redirect(`/calendars/${updatedCalendar.id}`);
  } catch (error) {
    console.log("edit error: ", error);
    res.status(500).send("error Unable to show edit");
  }
});

router.get("/:id/delete", async (req, res) => {
  try {
    const calendar = await Calendar.findByPk(req.params.id);
    let result = await calendar.destroy();

    console.log("!!!!!!!!!!", result, "!!!!!!!!");
    res.redirect("/calendars");
  } catch (error) {
    console.log(error);
    res.status(500).send("Unable to delete");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const calendar = await Calendar.findByPk(req.params.id, {
      include: models.User,
    });
    res.render("calendars/show", {calendar});
  } catch (error) {
    res.status(500).send("Error getting calendar");
  }
});

module.exports = router;
