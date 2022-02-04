const FortyTwoStrategy = require("passport-42").Strategy;
const passport = require("passport");
const User = require("../models/user-model");
require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new FortyTwoStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/intra-42/redirect",
    },
    (accessToken, refreshToken, profile, cb) => {
      if (
        User.findOne({ userId: profile._json.id }).then((currentUser) => {
          if (currentUser) {
            console.log("user is already in database");
            cb(null, currentUser);
          } else {
            new User({
              userId: profile._json.id,
              firstName: profile._json.first_name,
              lastName: profile._json.last_name,
              login: profile._json.login,
              email: profile._json.email,
              image: profile._json.image_url,
            })
              .save()
              .then((newUser) => {
                console.log("User created: ", newUser);
                cb(null, newUser);
              });
          }
        })
      );
    }
  )
);
