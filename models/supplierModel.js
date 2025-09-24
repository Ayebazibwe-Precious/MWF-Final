const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
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
  address: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
});

// signupSchema.plugin(passportLocalMongoose, {
//   usernameField: "email",
// });
module.exports = mongoose.model("SupplierModel", supplierSchema);
