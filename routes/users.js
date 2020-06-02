const router = require("express").Router();

const User = require("../models/index").User;

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


  module.exports = router;