const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  customerName: {
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
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  saleDate: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  salesAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  transportfee: {
    type: Boolean,
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("salesModel", salesSchema);
