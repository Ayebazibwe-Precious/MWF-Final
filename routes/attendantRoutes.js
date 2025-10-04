const express = require("express");
const router = express.Router();

const { ensureauthenticated, ensureAgent } = require("../middleware/auth");
//importing Models
const attendantStockModel = require("../models/attendantStockModel");
const StockModel = require("../models/stockModel");
const salesModel = require("../models/salesModel");



//getting the Attendant's  dashboard
router.get("/attendantDashboard", async (req, res) => {
  console.log("attendantDashboard called");
  try {
    // --- Build today's date in MM/DD/YYYY format ---
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // months are 0-indexed
    const day = now.getDate().toString().padStart(2, "0");
    const year = now.getFullYear();
    const todayStr = `${month}/${day}/${year}`; // e.g., "10/02/2025"

    // 1. Total Sales for Today
    const totalSalesResult = await salesModel.aggregate([
      { $match: { saleDate: todayStr } }, // filter by today's date
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);
    const totalSales = totalSalesResult.length ? totalSalesResult[0].total : 0;

    // 1b. Total number of transactions today
    const totalSalesCount = await salesModel.countDocuments({
      saleDate: todayStr,
    });

    // 2. Products Available (count of unique products in manager stock)
    const productsAvailable = await StockModel.countDocuments();

    // 3. Low Stock Count (items where qty < 10)
    const lowStockCount = await StockModel.countDocuments({
      qty: { $lt: 10 },
    });

    // 4. Stock Summary (aggregated from manager stock)
    const stockSummary = await StockModel.aggregate([
      {
        $group: {
          _id: { name: "$name", type: "$type" },
          totalQty: { $sum: "$qty" },
          avgCost: { $avg: "$cost" },
          avgPrice: { $avg: "$price" },
        },
      },
    ]);

    // Render to Pug
    res.render("attendantDashboard", {
      totalSales,
      totalSalesCount,
      productsAvailable,
      lowStockCount,
      stockSummary,
    });
  } catch (error) {
    console.error("Error loading attendant dashboard:", error);
    res.status(500).send("Server error");
  }
});







//Getting manager stock and dashboard
//ensureauthenticated, ensureManager
router.get("/stockAttendant", (req, res) => {
  res.render("stockAttendant");
});

//ensureauthenticated, ensureManager,
router.post("/stockAttendant", async (req, res) => {
  try {
    const stock = new attendantStockModel(req.body);
    console.log(req.body);
    await stock.save();
    res.redirect("/attendantStocklist");
  } catch (error) {
    console.error(error);
    res.redirect("/stockAttendant");
  }
});



//Getting stock from the DB.
router.get("/attendantStocklist", async (req, res) => {
  try {
    let items = await attendantStockModel.find().sort({ $natural: -1 });
    console.log(items);
    res.render("attendantStocklist", { items });
  } catch (error) {
    res.status(400).send("Unable to get data from the database!");
  }
});

//UPDATING STOCK
router.get("/attendantEditstock/:id", async (req, res) => {
  try {
    const item = await attendantStockModel.findById(req.params.id);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.render("attendantEditstock", { item }); //send to pug
  } catch (error) {
   console.log(error.message);
   res.status(500).send("Server Error"); 
  }
 });

router.put("/attendanteditstock/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const product = await attendantStockModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(product);
    if (!product) {
      return res.status(404).send("Product not found!");
    }
    res.redirect("/attendantStocklist");
  } catch (error) {}
});

router.post("/deleteAttendantstock", async (req, res) => {
  try {
    await attendantStockModel.deleteOne({ _id: req.body.id });
    res.redirect("/attendantStocklist");
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Unable to delete item from the DB!");
  }
});


// GET: Stock report data
router.get("/attendantStockreport", async (req, res) => {
  try {
    let items = await attendantStockModel.find().sort({ $natural: -1 });

    // Total distinct products
    let totalProducts = items.length;

    // Total stock value (sum of qty * cost)
    let totalStockValue = items.reduce((sum, item) => {
      return sum + item.quantity * item.costPrice;
    }, 0);

    // Format with commas
    let formattedStockValue = totalStockValue.toLocaleString();

    // Low stock items (<5 units)
    let lowStockItems = items.filter((item) => item.qty < 5).length;

    // Add current date
    let reportDate = new Date().toLocaleDateString("en-GB");
    // gives DD/MM/YYYY (e.g., 22/09/2025)

    res.render("attendantStockreport", {
      items,
      totalProducts,
      totalStockValue: formattedStockValue, // send formatted
      lowStockItems,
      reportDate,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send("Unable to get data from the database!");
  }
});






module.exports = router;

//getting the Attendant's  dashboard
// router.get("/attendantDashboard", async (req, res) => {
//   res.render("attendantDashboard");
// });