const router = require("express").Router();
const passport = require("passport");

const User = require("../models/index").User;

//получить всех пользователей, удалив в ответе пароли
router
  .route("/users")
  .get((req, res, next) => {
    User.getUsers()
      .then(docs => {
        res.type("json").send(docs.map(doc => {
          delete doc.password;
          delete doc["__v"];
          return doc;
        }));
      })
      .catch(next);
  });
//регистрация
router
  .route("/register")
  .post((req, res, next) => {
    passport.authenticate("register", (err, user, info) => {
      const { message = "" } = info ? info : {};
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.type("json").send({
          message,
          success: false,
          username: user.username
        });
      }
      //создать сессию с новым пользователем
      req.login(user, err => {
        if (err) {
          return next(err);
        }
        console.info(`New session created for user ${user.username}, sessionID: ${req.sessionID}`);
        res.type("json").send({
          message,
          success: true,
          username: user.username
        });
      })
    })(req, res, next)
  });

//login
router
  .route("/login")
  .post((req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      const { message = "" } = info ? info : {};
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.type("json").send({
          message,
          success: false,
          username: user.username
        });
      }
      //создать сессию с пользователем
      req.login(user, err => {
        if (err) {
          return next(err);
        }
        console.info(`New session created for user ${user.username}, sessionID: ${req.sessionID}`);
        res.type("json").send({
          message,
          success: true,
          username: user.username
        });
      })
    })(req, res, next)
  });

//logout
router
  .route("/logout")
  .post((req, res) => {
    const { username } = req.user;
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.type("json").send({
        success: true,
        message: `User ${username} logged out.`
      });
      console.info(`User ${username} sessionID: ${req.sessionID} logged out.`);
    })
  });
module.exports = router;