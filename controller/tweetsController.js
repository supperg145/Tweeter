const User = require("../models/UserSchema.js");
const Tweet = require("../models/TweetSchema.js");

const getTweets = (req, res) => {
  User.find()
    .populate("tweets")
    .then((users) => {
      const tweets = Tweet.find()
      tweets.then((tweet) =>       
        res.render("tweets", {
        users: users,
        tweets: tweet
      }))

    })
    .catch((err) => console.log(err));
};

getPostTweetPage = (req, res) => {
  res.render("postTweet", {
    postTweetError: "",
  });
};

const postTweets = (req, res) => {
  //console.log(req.body)
  //console.log(req.cookies)

  //add validation
  if (req.body.title === "" || req.body.tweet === "") {
    res.render("postTweet", { postTweetError: "All fields are required" });
  }

  if (req.body.tweet.length > 50 || req.body.title.length < 20) {
    res.render("postTweet", {
      postTweetError:
        "Tweet must be less than 50 characters and title must be more than 20 characters",
    });
  }

  const tweetWithId = {
    ...req.body,
    userId: res.locals.id,
  };
  console.log(res.locals.email);
  const tweet = new Tweet(tweetWithId);
  tweet
    .save()
    .then(() => {
      User.findOne({ email: res.locals.email })
        .then((user) => {
          console.log(user);
          let newArr = user.tweets;
          newArr.push(tweet._id);
          user.messages = newArr;

          user
            .save()
            .then(() => {
              const user = User.find();
              user
                .populate("tweets")
                .then(res.redirect("/tweet"))
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getTweetPage = (req, res) => {
  const tweet = Tweet.findOne({ _id: req.params.id });
  tweet
    .then((result) => {
      console.log(result);
      res.render("tweetPage", { tweet: result });
    })
    .catch((err) => console.log(err));
};

getEditTweetPage = (req, res) => {
  const tweet = Tweet.findOne({ _id: req.params.id });
  tweet
    .then((result) => {
      console.log(result);
      res.render("editTweet", { tweet: result, editTweetError: "" });
    })
    .catch((err) => console.log(err));
};

const editTweet = (req, res) => {
    const { title, tweet } = req.body;
    const { id } = req.params;


    if (title === "" || tweet === "") {
        return Tweet.findById(id)
            .then((foundTweet) => {
                res.render("editTweet", {
                    tweet: foundTweet,
                    editTweetError: "All fields are required",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    if (tweet.length > 50 || title.length < 20) {
        return Tweet.findById(id)
            .then((foundTweet) => {
                res.render("editTweet", {
                    tweet: foundTweet,
                    editTweetError: "Tweet must be less than 50 characters and title must be more than 20 characters",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    Tweet.findByIdAndUpdate(id, { title, tweet })
        .then((updatedTweet) => {
            if (!updatedTweet) {
                return res.status(404).send("Tweet not found");
            }
            res.redirect(`/tweet`);
        })
        .catch((err) => {
            console.log(err)
        });
};


const deleteTweet = (req, res) => {
  console.log("Send delete request for tweet with id: ", req.params.id);
  Tweet.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/tweet");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getTweets,
  getPostTweetPage,
  postTweets,
  deleteTweet,
  editTweet,
  getTweetPage,
  getEditTweetPage,
};
