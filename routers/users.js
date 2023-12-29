const express = require("express");
const router = express.Router();
const models = require("./../models");
const User = models.User;
const sequelize = models.sequelize;

// Route to display all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render("users/index", {title: "Users - List", users});
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
});

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render("users/index", {title: "Users - List", users});
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
});

// Route to display the form for creating a new user
router.get("/users/new", (req, res) => {
  res.render("users/new", {title: "Create New User"});
});

router.post("/users/new", async (req, res) => {
  const userParams = req.body.user;
  console.log("userParms", userParams);
  try {
    const newUser = await User.create(userParams);
    res.redirect(`/users/${newUser.id}`);
  } catch (error) {
    console.log("/users/new post error: ", error);
    res.status(500).send("Unable to create user"); // Send an error response

    throw error;
  }
});

router.get("/users/:id/edit", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.render("users/edit", {user});
  } catch (error) {
    res.status(500).send("unable to get user");
  }
});

// UPDATE
router.post("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userParams = req.body.user;

    const user = await User.findByPk(id);
    if (user) {
      await user.update(userParams); // Update the user with new data
      res.redirect(`/users/${id}`); // Redirect to the user's detail page
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Unable to update user:", error);
  }
});

//DELETE
router.get("/users/:id/delete", async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);
    let result = await user.destroy();

    console.log("!!!!!!!!!!", result, "!!!!!!!!");
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Unable to delete users: ", error);
  }
});

// router.delete("/users/:id", async (req, res) => {
//   try {
//     let user = await User.findByPk(req.params.id);
//     let result = await user.destroy();

//     console.log("!!!!!!!!!!", result, "!!!!!!!!");
//     res.redirect("/");
//   } catch (error) {
//     res.status(500).send("Unable to delete users: ", error);
//   }
// });

// Route to display a single user
router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.render("users/show", {title: `User - ${user.id}`, user});
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
});

module.exports = router;
