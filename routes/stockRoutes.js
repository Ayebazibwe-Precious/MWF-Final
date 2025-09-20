const express = require("express");
const router = express.Router();

const { ensureauthenticated, ensureManager } = require("../middleware/auth.js");

//import stock model
const StockModel = require("../models/stockModel");
const salesModel = require("../models/salesModel");
const { now } = require("mongoose");

//Getting manager stock and dashboard
//ensureauthenticated, ensureManager
router.get("/stockManager", (req, res) =>{
    res.render("stockManager");
})

//ensureauthenticated, ensureManager,
router.post("/stockManager", async (req, res) => {
  try {
    const stock = new StockModel(req.body);
    console.log(req.body);
    await stock.save();
    res.redirect("/managerDashboard");
  } catch (error) {
    console.error(error);
    res.redirect("/stockManager");
  }
});

//getting the Manager's dashboard
router.get("/managerDashboard", async (req, res) => {
    res.render("managerDashboard");
});


//getting the Attendant's  dashboard
router.get("/attendantDashboard", async (req, res) => {
    res.render("attendantDashboard");
});

module.exports = router;