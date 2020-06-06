const router = require("express").Router();
const { validationResult } = require("express-validator");

const Poll = require("../models/index").Poll;
const User = require("../models/index").User;
const validatePoll = require("../validators/index").poll;


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

//создание голосования
router
  .route("/create_poll")
  .post(validatePoll, (req, res, next) => {
    const errors = validationResult(req);
    const { title, shortName, options } = req.body;
    const { sessionID } = req;
    console.log("User " + req.user);
    console.log("Ses " + JSON.stringify(req.session));
    if (!errors.isEmpty()) {
      const { param, msg } = errors.array()[0];
      return next({ param, msg });
    }
    if (!req.user) {
      return next(Error("Must be logged in to add new poll"));
    }
    User.findOne({ "_id": req.user._id }, (err, user) => {
      if (err) {
        return next(err);
      }
      const poll = new Poll({
        options: options.map((option, index) => ({
          option,
          votes: 0
        })
        ),
        createTime: Date.now(),
        createdBy: user._id,
        seedColor: Math.floor(Math.random() * 360),
        shortName: shortName || user.polls.length,
        title,
        voters: [
          {
            sessionID,
            dateVoted: Date.now()
          }
        ],
        totalVotes: 0
      });
      poll.save(err => {
        if(err) {
          return next(err);
        }
        User.findOneAndUpdate({
          _id: user._id
        },
        {
          $push: {
            polls: poll._id
          }
        })
        res.type("json").send({
          success: true,
          message: `Successfully created a new poll: ${title}`,
          poll: {
            shortName: poll.shortName,
            user: user.username,
            title: poll.title
          }
        })
      },
        err => err && next(err))
    })
    
  });

module.exports = router;