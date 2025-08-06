exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next(); // Session check
  passport.authenticate('bearer', { session: false })(req, res, next); // Bearer token check
};

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') return next();
  res.status(403).json({ message: 'Forbidden: Admin access required' });
};