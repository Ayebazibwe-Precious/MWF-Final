const express = require("express");
const router = express.Router();

const StockModel = require("../models/stockModel");
const SalesModel = require("../models/salesModel");

//  Sales vs Stock Chart
router.get("/api/charts/sales-vs-stock", async (req, res) => {
  try {
    const stocks = await StockModel.find();
    const salesData = await SalesModel.aggregate([
      { $group: { _id: "$productName", totalSold: { $sum: "$quantity" } } },
    ]);

    const salesMap = {};
    salesData.forEach((sale) => {
      salesMap[sale._id] = sale.totalSold;
    });

    res.json({
      labels: stocks.map((p) => p.name),
      sales: stocks.map((p) => salesMap[p.name] || 0),
      stock: stocks.map((p) => p.qty),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load Sales vs Stock data" });
  }
});

// --- Top Products Chart ---
router.get("/api/charts/top-products", async (req, res) => {
  try {
    const topProducts = await SalesModel.aggregate([
      { $group: { _id: "$productName", totalSold: { $sum: "$quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      labels: topProducts.map((p) => p._id),
      values: topProducts.map((p) => p.totalSold),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load Top Products data" });
  }
});

module.exports = router;
