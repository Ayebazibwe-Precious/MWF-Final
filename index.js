//Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const moment = require("moment");
const methodOverride = require("method-override");

require("dotenv").config();
const UserModel = require("./models/userModel");
//import routes
const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");
const salesRoutes = require("./routes/salesRoutes");


//Instantiations
const app = express();
const port = 3000;

//Configurations
app.locals.moment = moment;
//setting up mongoDB collection
mongoose.connect(process.env.MONGODB_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connected!');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

  // Setting view engine to pug
app.set('view engine', 'pug')
app.set("views", path.join(__dirname, 'views'))

//MIDDLE WARE
//method override
app.use(methodOverride("_method"));
//app.use(express.static('public')); // static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//express session.config
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, //one day(time it takes to expire)
  })
);
//Passport configs
app.use(passport.initialize());
app.use(passport.session());

//authenticate with passport local strategy
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

//routes
app.use("/", authRoutes);
app.use("/", stockRoutes);
app.use("/", salesRoutes);






app.use("/", (req, res) => {
  res.status(404).send("Oops! Route not found.");
});

app.listen(port, () => console.log(`listening on port ${port}`));