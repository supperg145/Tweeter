const mongoose = require("mongoose");
const moment = require('moment');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 10
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 15
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tweets: [{
    type: mongoose.Types.ObjectId,
    ref: "Tweet"
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(created_at) {
      return moment(created_at).format('YYYY-MM-DD HH:mm:ss');
    },

  }
})

const User = mongoose.model("User", userSchema);

module.exports = User;
