require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const DB = require("./models/index");

const PORT = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

//инициализация паспорта
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  },
  store: new MongoStore({
    mongooseConnection: DB.DB
  })
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});