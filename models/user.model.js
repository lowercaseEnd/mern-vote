const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date
  },
  locked: {
    type: Boolean
  },
  deleted: {
    type: Boolean
  },
});

module.exports = mongoose.model("User", UserSchema);