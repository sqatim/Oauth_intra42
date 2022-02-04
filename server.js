const express = require("express");
const app = express();
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth-routes");

app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 2 * 60 * 1000,
    keys: process.env.SESSION_KEYS,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_DB, () => {
  console.log("connected to mongodb");
});

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen("3001", () => {
  "listening on port 3001";
});
