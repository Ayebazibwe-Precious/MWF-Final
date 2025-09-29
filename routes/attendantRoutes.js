const express = require("express");
const router = express.Router();

const { ensureauthenticated, ensureAgent } = require("../middleware/auth");
//importing Models
const attendantStockModel = require("../models/attendantStockModel");
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
//getting the Attendant's  dashboard
router.get("/attendantDashboard", async (req, res) => {
  res.render("attendantDashboard");
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
   console.log(error.message);q
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