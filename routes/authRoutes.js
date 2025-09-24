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
  console.log("Login called")
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

//Usetable Actions
//UPDATING USERS
//Edit
router.get("/editUser/:id", async (req, res) => {
  let user = await UserModel.findById(req.params.id);
  // console.log(item)
  res.render("editUser", { user });
});
router.put("/editUser/:id", async (req, res) => {
  try {
    console.log("Updating User", req.params.id);
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(user);
    if (!user) {
      return res.status(404).send("User not found!");
    }
    res.redirect("/usersTable");
  } catch (error) {}
});

//deleting
router.post("/deleteuser", async (req, res) => {
  try {
    await UserModel.deleteOne({ _id: req.body.id });
    res.redirect("/usersTable");
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Unable to delete user form the DB!");
  }
});


module.exports = router;