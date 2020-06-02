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
  shortName: {
    type: String,
    required: true,
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
//получить список всех голосований
PollSchema.statics.getPolls = function() {
  return new Promise((resolve, reject) => {
    this.find((err, docs) => {
      if(err) {
        return reject(err);
      }
      resolve(docs);
    })
  })
}

module.exports = mongoose.model("Poll", PollSchema);