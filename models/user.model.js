const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
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
  polls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll"
  }]
});
//сравнение введёного пользователем пароля с паролем в бд
UserSchema.methods.comparePasswords = async function (password) {
  return bcrypt.compare(password, this.password);
};
//получение списка всех пользователей
UserSchema.statics.getUsers = function() {
  return new Promise((resolve, reject) => {
    this.find((err, docs) => {
      if(err) {
        return reject(err);
      }
      resolve(docs);
    })
  })
};

module.exports = mongoose.model("User", UserSchema);