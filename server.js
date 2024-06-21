const express = require("express");
const routes = require("./config/routes");
const cookieParser = require('cookie-parser')
const morgan = require("morgan");
const bodyParser = require('body-parser');
require("dotenv").config();
require("./config/mongoose")

//initializing express app with PORT
const app = express();
const PORT = 2000;

app.use(cookieParser())

app.use(morgan("dev"));
//connect styling to the file
app.use("/public", express.static("public"));
//parsing incoming data from form to an object
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
//set the view engine as ejs to be able to show ejs code
app.set("view engine", "ejs");
//tell the server where to find routes
app.use(routes);

//start the server
app.listen(PORT, () => console.log(`App is listening on ${PORT}`))