const express = require("express");
const router = express.Router();

const { ensureauthenticated, ensureAgent } = require("../middleware/auth");
//importing Models
const salesModel = require("../models/salesModel");
const StockModel = require("../models/stockModel");


router.get("/salesEntry", async (req, res) => {
  try {
    const stocks = await StockModel.find();
    res.render("salesEntry", { stocks });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/salesEntry", ensureauthenticated, ensureAgent, async (req, res) => {
  try {
    const {
      customerName,
      productName,
      productType,
      quantity,
      unitPrice,
      saleDate,
      paymentType,
      transportfee,
      total,
    } = req.body;
    const userId = req.session.user._id;
    const stock = await StockModel.findOne({
      name: productName,
      type: productType,
    });
    if (!stock) {
      return res.status(400).send("Stock not found!");
    }
    if (stock.qty < Number(quantity)) {
      return res
        .status(400)
        .send(`Insufficient stock!, only ${stock.qty} available`);
    }
    //if you want to calculate total using backend not frontend(add it's field in the dis-structuring)
    let totalPrice = unitPrice * quantity;
    if (transportfee) {
      totalPrice  *= 1.05;
    }

    //if total is already captured no need to do the above
    // if(transportRequired){
    //     total *= 1.05    //add 5%
    // };
    if (stock && stock.qty > 0) {
      const sale = new salesModel({
        customerName,
        productType,
        productName,
        quantity,
        unitPrice,
        saleDate,
        paymentType,
        salesAgent: userId,
        transportfee: !!transportfee,
        total: totalPrice,
      });
      console.log(userId);
      await sale.save();

      //Decrease  quantity from the stock collection
      stock.qty -= quantity;
      console.log("New quantity after sale", stock.qty);
      await stock.save(); //StockModel
      res.redirect("/saleslist");
    } else {
      return res.status(404).send("Product Sold Out!");
    }
  } catch (error) {
    console.error(error.message);
    res.redirect("/salesEntry");
  }
});

//printing in the terminal(should be before console.log(userId);)
// console.log("saving a sale", sale);

router.get("/saleslist", async (req, res) => {
  try {
    //sales agent only sees their sales
    const sales = await salesModel.find().populate("salesAgent", "email");
    // req.session.user = currentUser
    // const currentUser = req.session.user;
    // console.log(currentUser);
    //res.render("saleslist", { sales, currentUser });

    res.render("saleslist", { sales, currentUser: req.session.user });

  } catch (error) {
    console.log(error.message);
    res.redirect("/");
  }
});
 
//Generating reciepts

router.get("/receipt/:id", async (req, res) => {
  try {
    //sales agent only sees their sales
    const sale = await salesModel
      .findOne({ _id: req.params.id })
      .populate("salesAgent", "email");
    if (!sale) {
      return res.status(404).send("Sale not found!");
    }
    res.render("receipt", { sale }); //: [sale]                                //res.render("receipt", { sale });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Unable to find the sale!");
  }
});
//UPDATING Sales
router.get("/editsale/:id", async (req, res) => {
  try {
    const sale = await salesModel.findById(req.params.id);
    if (!sale) {
      return res.status(404).send("sale not found");
    }
    res.render("salesedit", { sale }); //send to pug
  } catch (error) {
   console.log(error.message);
   res.status(500).send("Server Error"); 
  }
 });

router.put("/editsale/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const sale = await salesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(sale);
    if (!sale) {
      return res.status(404).send("Product not found!");
    }
    res.redirect("/saleslist");
  } catch (error) {}
});

router.post("/deletesale", async (req, res) => {
  try {
    await salesModel.deleteOne({ _id: req.body.id });
    res.redirect("/saleslist");
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Unable to delete  from the DB!");
  }
});


// GET: Sales report
router.get("/salesreport", async (req, res) => {
  try {
    let sales = await salesModel
      .find()
      .populate("salesAgent", "email")
      .sort({ $natural: -1 });

    let reportDate = new Date().toLocaleDateString("en-GB");

    res.render("salesreport", {
      sales,
      totalSales: 0,
      totalTransactions: "0",
      reportDate,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send("Unable to get data from the database!");
  }
});









module.exports = router;
