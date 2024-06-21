const express = require("express");
const router = express.Router();
const userFunctions = require("../controller/userController");
const authentication = require("../middlewares/auth.js");
const tweetFunctions = require("../controller/tweetsController");

// Homepage route
router.get("/", authentication.loginAuth, userFunctions.getHomePage);

// Registration rout
router.post("/registerUser", authentication.loginAuth, userFunctions.registerUser);

// Login route
router.post("/login", userFunctions.loginUser);

// Logout route 
router.get("/logout", userFunctions.logoutUser);

// Tweet routes
// List all tweets
router.get("/tweet", authentication.isUserLoggedIn, tweetFunctions.getTweets);

// Add tweet form page
router.get("/addTweet", authentication.isUserLoggedIn, tweetFunctions.getPostTweetPage);

// Post a new tweet
router.post("/posttweet", authentication.isUserLoggedIn, tweetFunctions.postTweets);

// View a specific tweet
router.get("/tweet/:id", authentication.isUserLoggedIn, tweetFunctions.getTweetPage);

//Delete a specific tweet
router.get("/deletetweet/:id",authentication.isUserLoggedIn, tweetFunctions.deleteTweet);

//Edit specific tweet
//Get edit page
router.get("/tweet/edit/:id", authentication.isUserLoggedIn, tweetFunctions.getEditTweetPage);

//Edit a specific tweet
router.post("/tweet/edit/:id", authentication.isUserLoggedIn, tweetFunctions.editTweet);

module.exports = router;
