const User = require("../models/UserSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

getHomePage = (req, res) => {
  res.render("homePage", {
    registrationError: "",
    loginError: "",
  });
};

const registerUser = (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Validate user input
  if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "") {
    return res.render("homePage", {
      registrationError: "All fields are required",
      loginError: ""
    });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.render("homePage", {
      registrationError: "Passwords do not match",
      loginError: ""
    });
  }

  // Check if user already exists
  User.findOne({ email: email })
    .then(existingUser => {
      if (existingUser) {
        res.render("homePage", {
          registrationError: "User already exists. Please log in.",
          loginError: ""
        });
      } else {
        // Hash the password
        return bcrypt.hash(password, 10);
      }
    })
    .then(hash => {
      // Create new user object
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash
      });

      // Save user to database
      return newUser.save();
    })
    .then(() => {
      console.log("User created successfully");
      res.redirect("/tweet");
    })
    .catch(err => {
      console.log("Error registering user:", err);
      res.render("homePage", {
        registrationError: "Something went wrong. Please try again.",
        loginError: ""
      });
    });
};

module.exports = {
  registerUser
};


loginUser = async (req, res) => {
  console.log("Login User", req.body);
  if (req.body.email === "" || req.body.password === "") {
    res.render("homePage", {
      loginError: "All fields are required",
      registrationError: "",
    });
  } else {
    let existUser = await User.findOne({ email: req.body.email });
    if (!existUser) {
      res.render("homePage", {
        loginError: "User does not exist",
        registrationError: "",
      });
    } else {
      let correctPassword = bcrypt.compareSync(
        req.body.password,
        existUser.password
      );

      if (!correctPassword) {
        res.render("homePage", {
          loginError: "Incorrect Password",
          registrationError: "",
        });
      } else {
        let userToken = jwt.sign({ user: existUser }, process.env.SECRET_TOKEN);
        res.cookie("userToken", userToken);
        res.redirect("/tweet");
      }
    }
  }
};

logoutUser = (req, res) => {
  res.clearCookie("userToken");
  res.redirect("/");
};

module.exports = {
  getHomePage,
  registerUser,
  loginUser,
  logoutUser,
};
