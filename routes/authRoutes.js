  const express = require("express");
const router = express.Router();
const passport = require("passport");

const UserModel = require("../models/userModel");
const StockModel = require("../models/stockModel");
//getting the Signup form
router.get("/signup", (req, res) => {
  res.render("signup", { title: "signup page" });
});

router.post("/signup", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    console.log(req.body);
    let existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("Already exists!");
    } else {
      await UserModel.register(user, req.body.password, (error) => {
        if (error) {
          throw error;
        }
        res.redirect("/login");
      });
    }
    // user.save();
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login",passport.authenticate("local", {failureRedirect:'/login'}), (req, res) => {
    req.session.user = req.user;
    if (req.user.role === "Manager") {
      res.redirect("/managerDashboard");
    } else if (req.user.role === "Attendant") {
      res.redirect("/attendantDashboard");
    } else (res.render("noneuser"));
  });

//Logging Out
  router.get("/logout", (req, res) => {
    if (req.session) {
      req.session.destroy((error) => {
        if (error) {
          return res.status(500).send("Error loggingOut");
        }
        res.redirect("/");
      });
    }
  });

  //alternative
  router.post("/logout", (req, res) => {
    req.logout((error) => {
      if (error) {
        return res.status(500).send("Error loggingOut");
      }
      res.redirect("/");
    });
  });

  //getting user from the db
  router.get("/usersTable", async (req, res) => {
    try {
      let users = await UserModel.find().sort({ $natural: -1 });
      console.log(users);
      res.render("usersTable", { users });
    } catch (error) {
      res.status(400).send("User not found!");
    }
  });

module.exports = router;