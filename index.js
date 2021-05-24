const PORT = process.env.PORT || 5000;

const BG_FAKE = process.env.BG_FAKE;

var express = require("express");
var path = require("path");
var app = express();
var cookieParser = require("cookie-parser");
var request = require("request-promise");
var jsforce = require("jsforce");

//Set up App
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

//Routes
app.get("/", function (req, res) {
  res.render("index", {
    background: BG_FAKE,
  });
});

//Run
app.listen(PORT, function () {
  console.log("Listening on Port " + PORT);
});
