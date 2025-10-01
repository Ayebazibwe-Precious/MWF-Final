const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  // status: {
  //   type: String,
  //   required: true,
  // },
  qty: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  dateReceived: {
    type: String,
    required: true,
  },
  quality: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
});

module.exports = mongoose.model("StockModel", stockSchema);
