const express = require("express");
const router = express.Router();

const { ensureauthenticated, ensureManager } = require("../middleware/auth.js");

//import  models
const StockModel = require("../models/stockModel");
const salesModel = require("../models/salesModel");
const UserModel = require("../models/userModel");
const SupplierModel = require("../models/supplierModel");
const { now } = require("mongoose");

//Getting manager stock and dashboard
//ensureauthenticated, ensureManager
router.get("/stockManager", ensureauthenticated, ensureManager, (req, res) => {
  res.render("stockManager");
});

//ensureauthenticated, ensureManager,
router.post("/stockManager", async (req, res) => {
  try {
    const stock = new StockModel(req.body);
    console.log(req.body);
    await stock.save();
    res.redirect("/stocklist");
  } catch (error) {
    console.error(error);
    res.redirect("/stockManager");
  }
});

//getting the Manager's dashboard
// router.get("/managerDashboard",ensureauthenticated, ensureManager, async (req, res) => {
//   res.render("managerDashboard");
// });
router.get(
  "/managerDashboard", async (req, res) => {
    try {
      // Total Stock Value calculation
      const result = await StockModel.aggregate([
        {
          $group: {
            _id: null,
            totalValue: { $sum: { $multiply: ["$qty", "$price"] } },
            totalQuantity: { $sum: "$qty" },
          },
        },
      ]);
      const totalStockValue = result.length > 0 ? result[0].totalValue : 0;
      const totalQuantity = result.length > 0 ? result[0].totalQuantity : 0;
      // Format the total stock value for readability
      const formattedStockValue = totalStockValue.toLocaleString();

      // Total Sales calculation
      const salesResult = await salesModel.aggregate([
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$total" }, // sum the total field from each sale
          },
        },
      ]);

      const totalSales = salesResult.length > 0 ? salesResult[0].totalSales : 0;
      const formattedTotalSales = totalSales.toLocaleString();

      // Render dashboard
      res.render("managerDashboard", {
        totalStockValue: formattedStockValue,
        totalQuantity,
        totalSales: formattedTotalSales,   //passing totasales to the pug template
      });
    } catch (error) {
      console.error("Error calculating total stock value:", error.message);
      res.status(500).send("Server Error while calculating total stock value");
    }
  }
);




//getting the Attendant's  dashboard
router.get("/attendantDashboard", async (req, res) => {
  res.render("attendantDashboard");
});

//Getting stock from the DB.
router.get("/stocklist",ensureauthenticated, ensureManager, async (req, res) => {
  try {
    let items = await StockModel.find().sort({ $natural: -1 });
    console.log(items);
    res.render("stocklist", { items });
  } catch (error) {
    res.status(400).send("Unable to get data from the database!");
  }
});

//UPDATING STOCK
router.get("/editstock/:id", async (req, res) => {
  try {
    const item = await StockModel.findById(req.params.id);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.render("stockedit", { item }); //send to pug
  } catch (error) {
   console.log(error.message);
   res.status(500).send("Server Error"); 
  }
 });

router.put("/editstock/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const product = await StockModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(product);
    if (!product) {
      return res.status(404).send("Product not found!");
    }
    res.redirect("/stocklist");
  } catch (error) {}
});

router.post("/deletestock", async (req, res) => {
  try {
    await StockModel.deleteOne({ _id: req.body.id });
    res.redirect("/stocklist");
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Unable to delete item from the DB!");
  }
});


// GET: Stock report data
router.get("/stockreport", async (req, res) => {
  try {
    let items = await StockModel.find().sort({ $natural: -1 });

    // Total distinct products
    let totalProducts = items.length;

    // Total stock value (sum of qty * cost)
    let totalStockValue = items.reduce((sum, item) => {
      return sum + item.qty * item.cost;
    }, 0);

    // Format with commas
    let formattedStockValue = totalStockValue.toLocaleString();

    // Low stock items (<5 units)
    let lowStockItems = items.filter((item) => item.qty < 5).length;

    // Add current date
    let reportDate = new Date().toLocaleDateString("en-GB");
    // gives DD/MM/YYYY (e.g., 22/09/2025)

    res.render("stockreport", {
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

   //Getting Suppliers Form
   router.get("/supplier", (req, res) => {
     res.render("supplier", { title: "supplier page" });
   });
   
   router.post("/supplier", async (req, res) => {
     try {
       const supplier = new SupplierModel(req.body);
       console.log(req.body);
       await supplier.save();
       res.redirect("/supplierlist");
     } catch (error) {
       console.error(error);
       res.redirect("/managerDashboard");
     }
   });

   //getting Suppliers from the db
     router.get("/supplierlist", async (req, res) => {
       try {
         let suppliers = await SupplierModel.find().sort({ $natural: -1 });
         console.log(suppliers);
         res.render("supplierlist", { suppliers });
       } catch (error) {
         res.status(400).send("Supplier not found!");
       }
     });
   
//Supplierlist Actions
//UPDATING SUPPLIERS
//Edit
router.get("/editsupplier/:id", async (req, res) => {
  let supplier = await SupplierModel.findById(req.params.id);
  // console.log(item)
  res.render("supplieredit", { supplier });
});
router.put("/editsupplier/:id", async (req, res) => {
  try {
    console.log("Updating Supplier", req.params.id);
    const supplier = await SupplierModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    console.log(supplier);
    if (!supplier) {
      return res.status(404).send("Supplier not found!");
    }
    res.redirect("/supplierlist");
  } catch (error) {}
});

//deleting
router.post("/editsupplier", async (req, res) => {
  try {
    await SupplierModel.deleteOne({ _id: req.body.id });
    res.redirect("/supplierlist");
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Unable to delete supplier form the DB!");
  }
});




module.exports = router;
