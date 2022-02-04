const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema({
  userId: String,
  firstName: String,
  lastName: String,
  login: String,
  email: String,
  image: String
});

const User = mongoose.model("User", userScheme);

module.exports = User;
