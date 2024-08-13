require('dotenv').config()
const express =require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const flash = require('connect-flash');
const User = require("./models/User");
const app = express();

const PORT = process.env.PORT || 3000

// ************************  Database Connection  **********************************//
const {connectMonggose} = require('./config/db')
connectMonggose();

app.use(express.json());

//run seeders
const {superAdmin} = require('./seeders/admin');
superAdmin();

// *************************    Assets    ****************************************//
app.use(express.static("public"));
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());

// Configure express-flash and express-session
app.use(session({
  secret: 'jwtSecret',
  resave: false,
  saveUninitialized: false,
}));


app.use(flash());

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send('File upload error: ' + err.message);
  }
  next(err);
});
// Middleware for flash messages
app.use(function (req, res, next) {
  res.locals.successMessage = req.flash('success');
  res.locals.welcomeMessage = req.flash('welcome');
  res.locals.errorMessage = req.flash('error');
  res.locals.logoutMessage = req.flash('logout');
  res.locals.warningMessage = req.flash('warning');
  next();
});
// ***********************************Routes ********************************//
app.use(require("./routes/index"))
app.use(require("./routes/users"))
app.use(require("./routes/item"))
app.use(require("./routes/account"))

// ************************* PORT ***********************************//

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
