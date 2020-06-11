const router = require("express").Router();
const { validationResult } = require("express-validator");

const db = require("../models/index");
const validatePoll = require("../validators/index").poll;


//список всех голосований
router
  .route("/polls")
  .get((req, res, next) => {
    db.Poll.getPolls()
      .then(docs => {
        res.type("json").send(docs);
      })
      .catch(next);
  });

//голосования одного пользователя
router
  .route("/:user/polls")
  .get((req, res, next) => {
    console.log(db.User.findOne({ username: req.params.user }).populate("polls"))
    db.User.findOne({ username: req.params.user })
      .populate("polls")
      .exec((err, user) => {
        if (err) {
          return next(err);
        }
        console.log(user);
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
    db.User.find(username)
      .populate("polls")
      .exec((err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(Error("No user was found"));
        }
        db.Poll.findOne({ shortName: poll, createdBy: user._id })
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
    const { id } = req.body;
    console.log(req.body);
    db.Poll.findOne({ _id: id })
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
        db.Poll.deleteOne({ _id: poll })
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
    // console.log("User " + req.user);
    // console.log("Ses " + JSON.stringify(req.session));
    if (!errors.isEmpty()) {
      const { param, msg } = errors.array()[0];
      return next({ param, msg });
    }
    if (!req.user) {
      return next(Error("Must be logged in to add new poll"));
    }
    db.User.findOne({ "_id": req.user._id }, (err, user) => {
      if (err) {
        return next(err);
      }
      const poll = new db.Poll({
        options: options.map((option, index) => ({
          option,
          votes: 0
        })),
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
      // console.log(poll)
      poll.save(err => {
        if (err) {
          return next(err);
        }
        db.User.findOneAndUpdate(
          { _id: user._id },
          {
            $push: {
              polls: poll._id
            }
          }, err => err && next(err));
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

//проголосовать
router
  .route("/:user/polls/:poll")
  .post((req, res, next) => {
    const { body, params, sessionID } = req;
    const { selectedOption } = body;
    const recentVote = 60 * 1000;//минута
    const updateComplete = (err, doc, timeRemaining = recentVote) => {
      res.type("json").send({
        success: !err,
        poll: doc,
        error: {
          message: err ? `Time remaining: ${timeRemaining}ms` : "No Error",
          timeRemaining
        }
      });
    }
    db.Poll.find({ "_id": params.poll })
      .populate("createdBy", "username")
      .exec((err, polls) => {
        const poll = polls.filter(poll =>
          poll.createdBy.username === params.user)[0];
        if (err) {
          return next(err);
        }
        if (!poll) {
          return next(Error("Invalid poll name"));
        }
        console.log(poll.createdBy.username, params.user)
        if (poll.createdBy.username !== params.user) {
          return next(Error("Invalid poll title or username"));
        }

        const recentVoters = poll.voters.filter(vote => {
          return Date.now() - vote.dateVoted < recentVote
        });
        const votersIds = recentVoters.map(({
          sessionID
        }) => sessionID);
        const voterIndex = votersIds.indexOf(req.sessionID);

        if (voterIndex !== -1) {
          const timeRemaining = Math.floor(
            (recentVote - (Date.now() - poll.voters[voterIndex].dateVoted))
          );
          return updateComplete(true, poll, timeRemaining);
        } else {
          recentVoters.push({
            sessionID,
            dateVoted: Date.now()
          });
        }

        const options = JSON.parse(JSON.stringify(poll.options));
        console.log(poll.options)
        console.log(options)
        const optionNames = options.map(({ option }) => option);
        const optionIndex = optionNames.indexOf(selectedOption);
        if(optionIndex !== -1) {
          options[optionIndex].votes++;
        } else {
          return next(Error("No such option"));
        }

        db.Poll.findByIdAndUpdate(
          poll._id,
          {
            $set: {
              "options": options,
              "voters": recentVoters
            },
            $inc: {
              totalVotes: 1
            }
          },
          {
            new: true
          }
        ).exec((err, doc) => {
          if (err) {
            return next(err);
          }
          if (!doc) {
            return next(Error("Poll was not found!"));
          }
          updateComplete(false, doc);
        });
      });


  });
module.exports = router;