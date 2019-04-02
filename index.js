const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");
require("dotenv").config();
const app = express();
const sessionController = require("./sessionController");
const ratingController = require("./ratingController");

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 24 * 5
  })
);
massive(process.env.CONNECTION_STRING)
  .then(database => {
    app.set("db", database);
  })
  .catch(error => {
    console.log("error with massive", error);
  });

app.get("/api/session", sessionController.getIP);
app.get("/api/rating/:quote", ratingController.getRatings);
app.post("/api/addrating", ratingController.addRating);

const SERVER_PORT = 4000;
app.listen(SERVER_PORT, () => {
  console.log(`Tuning into Port ${SERVER_PORT} 📡`);
});
