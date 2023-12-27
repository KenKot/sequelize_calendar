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

router.get("/", (req, res) => {
  User.findAll().then((users) => {
    console.log(users);
    console.log("+++++++++++++++++++++++++++");
    let bob = users[0];
    console.log(bob);
    console.log(bob.fname);
    console.log(bob.lname);
    // res.send(users);
    res.render("users/index", {title: "users /index", users});

    // res.send(data);
  });

  //   res.render("users/index", {title: "users /index", users});
  //   res.render("users/index", {title: "users /index", users});
});

// router.get("/", async (req, res) => {
//   const users = await getUsers();
//   const plainUsers = users.map((user) => user.get({plain: true}));
//   console.log("+++++++", plainUsers, "++++++++");

//   res.render("users/index", {title: "users /index", users: plainUsers});
// });

// var onIndex = (req, res) => {
//   User.findAll()
//     .then((users) => {
//       res.render('users/index', { users });
//     })
//     .catch((e) => res.status(500).send(e.stack));
// };
// router.get('/', onIndex);
// router.get('/users', onIndex);

module.exports = router;
