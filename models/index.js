const mongoose = require("mongoose");
const options = {
  url: `mongodb://localhost:27017/polls`,
  db: polls
};
mongoose.connect(options.url, options);
const db = mongoose.connection;
db.on("error", err => {
  console.error(`Mongoose connection error: ${err}`);
});
db.once("open", () => {
  console.info(`Mongoose default connection opened: ${options.db}`);
});

module.exports.User = require("./user.model");
module.exports.Poll = require("./poll.model");