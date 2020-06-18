const User = require("../models/index").User;
const register = require("./register");
const login = require("./login");

const initPassport = (passport) => {
  passport.serializeUser((user, done) =>
    done(null, user._id)
  );
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
  register(passport);
  login(passport);
};

module.exports = initPassport;