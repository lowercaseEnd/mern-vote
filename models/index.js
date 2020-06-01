const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", err => {
  console.error(`Mongoose connection error: ${err}`);
});
db.once("open", () => {
  console.info(`Mongoose default connection opened: ${process.env.DB}`);
});

module.exports.User = require("./user.model");
module.exports.Poll = require("./poll.model");
module.exports.DB = db;