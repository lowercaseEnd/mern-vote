const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createTime: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    index: Number,
    choice: String,
    votes: Number
  }],
  voters: [{
    sessionID: String,
    dateVoted: Date
  }],
  totalVotes: Number
});

module.exports = mongoose.model("Poll", PollSchema);