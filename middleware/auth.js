//Ensure user is authenticated
exports.ensureauthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect("/");
};

//Ensure User is a sales agent
exports.ensureAgent = (req, res, next) => {
  if (
    req.session.user &&
    (req.session.user.role === "Attendant" ||
      req.session.user.role === "Manager")
  ) {
    return next();
  }
  res.redirect("/");
};

//Ensure User is a Manager
exports.ensureManager = (req, res, next) => {
  if (req.session.user && req.session.user.role === "Manager") {
    return next();
  }
  res.redirect("/");
};
