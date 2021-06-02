const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const jsforce = require("jsforce");
const { getToken } = require("sf-jwt-token");

//Set up App
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const BG_FAKE = process.env.BG_FAKE;
const SURVEY_URL = process.env.SURVEY_URL;
const BUTTON_CLASS = process.env.BUTTON_CLASS;
const BUTTON_TEXT = process.env.BUTTON_TEXT;
const SURVEY_HAS_CONTACT = process.env.SURVEY_HAS_CONTACT;
const CONTACT_ID = process.env.CONTACT_ID;

let jwttoken;
const conn = new jsforce.Connection();

const initConnection = async () => {
  try {
    jwttoken = await getToken({
      iss: process.env.CLIENT_ID,
      sub: process.env.USERNAME,
      aud: process.env.LOGIN_URL,
      privateKey: process.env.PRIVATE_KEY,
      modalHeight: process.env.MODAL_HEIGHT,
      iframeHeight: process.env.IFRAME_HEIGHT,
    });

    conn.initialize({
      instanceUrl: jwttoken.instance_url,
      accessToken: jwttoken.access_token,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//Routes
app.get("/", async function (req, res) {
  let surveyUrl;
  if (SURVEY_HAS_CONTACT.toUpperCase() === "YES" && CONTACT_ID) {
    console.log("inside SURBEY HAS CONTACT");
    const body = {
      contactId: CONTACT_ID,
    };
    await initConnection();
    await conn.apex.post("/SurveyLink/", body, function (err, res) {
      if (err) {
        return console.error(err);
      }
      surveyUrl = res;
    });
  } else {
    surveyUrl = SURVEY_URL;
  }
  res.render("index", {
    background: BG_FAKE,
    surveyUrl: surveyUrl,
    buttonClass: BUTTON_CLASS,
    buttonText: BUTTON_TEXT,
  });
});

//Run
app.listen(PORT, function () {
  console.log("Listening on Port " + PORT);
});
