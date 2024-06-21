const mongoose = require("mongoose");
const moment = require("moment");

const tweetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title:{
    type: String,
    required: true,
    minLength: 20,
  },
  tweet: {
    type: String,
    required: true,
    maxLength: 50
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (created_at) {
      return moment(created_at).format("YYYY-MM-DD HH:mm:ss");
    },
  },
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
