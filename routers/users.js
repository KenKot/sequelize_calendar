const express = require("express");
const router = express.Router();
const models = require("./../models");
const User = models.User;
const sequelize = models.sequelize;

async function getUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.log("getUsers: ", error);
    throw error;
  }
}

router.get("/", async (req, res) => {
  const users = await getUsers();

  res.render("users/index", {title: "users /get", users});
});

module.exports = router;
