module.exports = {
  ensureAuthenticated: (req, res, next) => {
    console.log('Session:', req.session); // Debug session
    console.log('User:', req.user); // Debug user
    
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ 
      message: 'Unauthorized: Please log in first',
      authenticated: req.isAuthenticated()
    });
  }
};