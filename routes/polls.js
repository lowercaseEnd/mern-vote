const router = require("express").Router();

const Poll = require("../models/index").Poll;

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