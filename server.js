require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const logger = require("morgan");


const DB = require("./models/index");
// console.log(DB);
const router = require("./routes/index");

const PORT = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
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


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});