require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const DB = require("./models/index");
// console.log(DB);
const router = require("./routes/index");

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.static(path.join(__dirname, "client", "build")))
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(logger("dev"));
//инициализация паспорта
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    httpOnly: false
  },
  store: new MongoStore({
    mongooseConnection: DB.DB,
    collection: "sessions"
  })
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

require("./passport/index")(passport);


app.use("/auth", router.users);
app.use("/poll", router.polls);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});