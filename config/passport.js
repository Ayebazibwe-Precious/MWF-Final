const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/userModel");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          if (!user) {
            return done(null, false, {
              message: "Email not registered",
              field: "email",
            });
          }

          const isMatch = await user.authenticate(password);
          if (!isMatch.user) {
            return done(null, false, {
              message: "Wrong password",
              field: "password",
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Required for sessions
  passport.serializeUser(UserModel.serializeUser());
  passport.deserializeUser(UserModel.deserializeUser());
};
