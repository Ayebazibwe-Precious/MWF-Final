const mongoose = require("mongoose");

const attendantStockSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  costPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
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
    required: true,
  },
  measurements: {
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  reciever: {
    type: String,
  },
});

module.exports = mongoose.model("attendantStockModel", attendantStockSchema);
