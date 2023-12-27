const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
// const square = require("./square"); // Here we require() the name of the file without the (optional) .js file extension

// ----------------------------------------
// Body Parser
// ----------------------------------------
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

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
var usersRoutes = require("./routers/users");
app.use("/", usersRoutes);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
