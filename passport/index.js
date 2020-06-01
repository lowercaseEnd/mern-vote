const passport = require("passport");

const User = require("../models/index").User;
const register = require("./register");
const login = require("./login");

const initPassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
  register();
  login();
};

module.exports = initPassport;