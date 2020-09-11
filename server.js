const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const pool = require("./config.js");

// CONTROLLERS
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("it is working!");
});

// SIGNIN ROUTE
app.post("/signin", signin.handleSignin(pool,bcrypt));

// REGISTER ROUTE
app.post("/register", (req, res) => {
  register.handleRegister(req, res, pool,bcrypt);
});

// PROFILE ROUTE
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, pool);
});

// IMAGE ROUTE
app.put("/image", (req, res) => {
  image.handleImage(req, res, pool);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
