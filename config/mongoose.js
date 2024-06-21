const mongoose = require("mongoose");


const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then(() => {console.log("DB is connected")})
  .catch(err => console.log(err))