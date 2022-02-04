const router = require("express").Router();
const passport = require("passport");

router.get("/intra-42", passport.authenticate("42"));
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/intra-42/redirect", passport.authenticate("42"), (req, res) => {
  res.redirect("/");
});
module.exports = router;
