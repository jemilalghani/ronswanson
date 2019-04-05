const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");
require("now-env");
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
massive(process.env.DATABASE)
  .then(database => {
    app.set("db", database);
  })
  .catch(error => {
    console.log("error with massive", error);
  });

app.get("/api/session", sessionController.getIP);
app.get("/api/rating/:quote", ratingController.getRatings);
app.post("/api/check", ratingController.checkRating);
app.post("/api/addrating", ratingController.addRating);
app.use(express.static(`./build`));
const SERVER_PORT = 4000;
app.listen(SERVER_PORT, () => {
  console.log(`Tuning into Port ${SERVER_PORT} 📡`);
});
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile("./build/index.html");
});
