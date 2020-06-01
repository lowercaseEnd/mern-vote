const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/index").User;

const login = () => {
  passport.use(new LocalStrategy({
    session: true,
    passReqToCallback: true
  },
    (req, username, password, done) => {
      username = username.trim();
      password = password.trim();

      User.findOne({
        username: {
          $regex: new RegExp(`^${username}$`, "i")
        },
      },
        (err, user) => {
          //если имя не найдено выйти из функции
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(err, false, {
              message: `Username not found`
            });
          }
          if (user.deleted) {
            return done(null, false, {
              message: "Account was deleted"
            });
          }
          const isMatch = user.comparePasswords(password);

          if(!isMatch) {
            return done(null, false, {
              message: "Incorrect password"
            });
          }
          req.session.regenerate(err => {
            if(err) {
              return done(err);
            }
            return done(null, user);
          });
        }
      )
    })
  )
};

module.exports = login;