const jwt = require("jsonwebtoken");

function isUserLoggedIn(req, res, next) {
  //console.log(req.cookies.userToken)
  if (!req.cookies.userToken) {
    res.redirect("/");
  } else {
    jwt.verify(
      req.cookies.userToken,
      process.env.SECRET_TOKEN,
      function (err, userInfo) {
        if (err) {
          throw err;
        }
        res.locals.id = userInfo.user.id;
        res.locals.firstName = userInfo.user.firstName;
        res.locals.lastName = userInfo.user.lastName;
        res.locals.email = userInfo.user.email;

        //console.log(userInfo);
      }
    );
    next();
  }
}

function loginAuth(req, res, next) {
  if (req.cookies.userToken) {
    res.redirect("/tweet");
  } else {
    next();
  }
}

module.exports = {
  isUserLoggedIn,
  loginAuth,
};