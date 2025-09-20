const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
  role: {
    type: String,
    required: true,
  },
  checkbox: {
    type: String,
  },
});

signupSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});
module.exports = mongoose.model("UserModel", signupSchema);
