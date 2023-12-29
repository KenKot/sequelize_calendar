const express = require("express");
const router = express.Router();
const models = require("../models");
const Invitation = models.Invitation;
const User = models.User;
const Event = models.Event;

router.get("/", async (req, res) => {
  const invitations = await Invitation.findAll({
    include: [
      {
        model: models.User,
        attributes: ["id", "fname", "lname", "username", "email"], // Specify the attributes you want to include from the User
      },
      {
        model: models.Event,
        attributes: [
          "id",
          "name",
          "description",
          "date",
          "startTime",
          "endTime",
        ], // Specify the attributes you want to include from the Event
      },
    ],
    limit: 50, // Limiting the number of invitations to 50
  });

  res.render("invitations/index", {invitations});
});

//NEW
router.get("/new", async (req, res) => {
  const events = await Event.findAll();
  const users = await User.findAll();

  res.render("invitations/new", {events, users});
});

router.post("/new", async (req, res) => {
  const newInvitation = await Invitation.create({
    userId: req.body.userId,
    eventId: req.body.eventId,
  });

  res.redirect("/invitations");
});

//DELETE
router.get("/:userId/:eventId/delete", async (req, res) => {
  const userId = req.params.userId,
    eventId = req.params.eventId;

  const invitation = await Invitation.findOne({where: {userId, eventId}});
  await invitation.destroy();
  res.redirect("/invitations");
});

module.exports = router;
