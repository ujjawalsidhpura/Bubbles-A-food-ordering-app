// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const path = require('path');
const cookieSession = require('cookie-session');
const database = require('./database');
const apiRoutes = require('./apiRoutes');
const userRoutes = require('./userRoutes');


// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(cookieSession({
  name: 'session',
  path: '/',
  keys: ['This is a key that Im using to encrypt', '$!2@as125AF42%^&*'],
  maxAge: 24 * 60 * 60 * 1000
}))
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '../public')));
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const usersRoutes = require("../routes/users");
// const widgetsRoutes = require("../routes/widgets");
// const menusRoutes = require("../routes/menus");
// const loginRoutes = require("../routes/login");
// const ordersRoutes = require("../routes/orders") /* to be modified later */
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
// app.use("/api/menus", menusRoutes(db));
// app.use("/api/login", loginRoutes(db));
// app.use("/api/orders", ordersRoutes(db)); /* to be modified later */

// const usersRoutes = require("../routes/users");
// const widgetsRoutes = require("../routes/widgets");

// /api/endoints

const apiRouter = express.Router();
apiRoutes(apiRouter, database);
app.use('/api', apiRouter)


// /user/endpoints
const userRouter = express.Router();
userRoutes(userRouter, database);
app.use('/users', userRouter);


// const menusRoutes = require("../routes/menus");
// const loginRoutes = require("../routes/login");
// const registerRoutes = require("../routes/register");
// const logoutRoutes = require("../routes/logout");
// const loggedinRoutes = require("../routes/loggedin");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
// app.use("/api/menus", menusRoutes(db));
// app.use("/api/login", loginRoutes(db));
// app.use("/api/register", registerRoutes(db));
// app.use("/api/logout", logoutRoutes(db));
// app.use("/", loggedinRoutes(db));
// const usersRoutes = require("../routes/users");
// const widgetsRoutes = require("../routes/widgets");
// const menusRoutes = require("../routes/menus");
// const loginRoutes = require("../routes/login");
// const ordersRoutes = require("../routes/orders");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
// app.use("/api/menus", menusRoutes(db));
// app.use("/api/login", loginRoutes(db));
// app.use("/api/orders", ordersRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
