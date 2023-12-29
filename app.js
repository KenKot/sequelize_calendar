const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

// ----------------------------------------
// Method Override
// ----------------------------------------
// const methodOverride = require("method-override");
// const getPostSupport = require("express-method-override-get-post-support");

// app.use(
//   methodOverride(
//     getPostSupport.callback,
//     getPostSupport.options // { methods: ['POST', 'GET'] }
//   )
// );

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// ----------------------------------------
// Body Parser
// ----------------------------------------
// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));

const logger = require("morgan");
app.use(logger("dev"));

// app.use(express.json()); // for parsing application/json

// ----------------------------------------
// Template Engine
// ----------------------------------------
// ejs:
// Set EJS as the view engine
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.set("layout", "layouts/application"); // This means it will use 'layout.ejs'

// ----------------------------------------
// Routes
// ----------------------------------------

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).send("Something broke!"); // Send a generic error message
});

var usersRoutes = require("./routers/users");
app.use("/", usersRoutes);

const calendarRoutes = require("./routers/calendars");
app.use("/calendars", calendarRoutes);

const eventRoutes = require("./routers/events");
app.use("/events", eventRoutes);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
