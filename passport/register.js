// const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/index").User;
//функция для хеширования пароля
const hashPassword = async plainText => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(plainText, salt);
  return hashedPassword;
};

function registration(passport) {
  passport.use("register", new LocalStrategy({
    session: true,
    passReqToCallback: true
  },
    (req, username, password, done) => {
      //удаление лишних пробелов
      username = username.trim();
      password = password.trim();

      //поиск пользователя в бд
      User.findOne({
        username: {
          $regex: new RegExp(`^${username}$`, "i")
        },
      }, async (err, user) => {
        //не создавать пользователя если ник занят
        if (err) {
          return done(err);
        }
        if (user) {
          console.error(`Registration error: Username ${username} already in use.`);
          return done(null, false, {
            message: `Username already in use`
          });
        }
        console.info(`Creating user: ${username}`);
        let passwordHash = await hashPassword(password);
        const newUser = new User({
          username,
          password: passwordHash,
          polls: [],
          locked: false,
          deleted: false,
          dateCreated: new Date()
        });
        newUser.save(err => {
          if (err) {
            console.error(`Error saving user in db: ${err}`);
            return done(err);
          }
          console.info(`User ${newUser.username} has been added to db.`);
          return done(null, newUser, {
            message: `User ${username} added to db.`
          });
        });
      });
    }
  ))
}

module.exports = registration;
