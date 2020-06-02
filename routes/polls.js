const router = require("express").Router();

const Poll = require("../models/index").Poll;
const User = require("../models/index").User;

//список всех голосований
router
  .route("/polls")
  .get((req, res, next) => {
    Poll.getPolls()
      .then(docs => {
        res.type("json").send(docs);
      })
      .catch(next);
  });

//голосования одного пользователя
router
  .route("/:user/polls")
  .get((req, res, next) => {
    const { username } = req.params.user;
    User.find(username)
      .populate("polls")
      .exec((err, user) => {
        if (err) {
          return next(err);
        }
        res.type("json").send({
          success: true,
          message: "",
          polls: user ? user.polls : []
        });
      })
  });
//получить конкретное голосование конкретного пользователя
router
  .route("/:user/polls/:poll")
  .get((req, res, next) => {
    const { username, poll } = req.params;
    User.find(username)
      .populate("polls")
      .exec((err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(Error("No user was found"));
        }
        Poll.findOne({ shortName: poll, createdBy: user._id })
          .exec((err, poll) => {
            if (err) {
              return next(err);
            }
            if (!poll) {
              return next(Error("No poll was found"));
            }
            res.type("json").send({
              success: true,
              message: "",
              poll,
              username: user.username
            });
          })
      })
  });
//удалить голосование
router
  .route("/delete")
  .delete((req, res, next) => {
    const { id } = req.params;
    Poll.findOne({ _id: id })
      .populate("createdBy", "username")
      .exec((err, poll) => {
        if (err) {
          return next(err);
        }
        if (!poll) {
          return next(Error("No poll was found"));
        }
        if (req.user.username !== poll.createdBy.username) {
          return next(Error("Only creator may delete a poll"));
        }
        Poll.remove({ _id: poll })
          .exec(err => {
            if (err) {
              return next(err);
            }
            res.type("json").send({
              success: true,
              poll: {
                title: poll.title
              }
            });
          })
      })
  });
  
module.exports = router;