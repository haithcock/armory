// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// ADD THIS ROUTE FOR LOGIN (generates tokens)
router.post('/login', (req, res) => {
  // Replace with your real user authentication
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'password') {
    const user = { id: 1, name: "Admin" };
    
    // Generate tokens
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    
    res.json({ accessToken, refreshToken });
  } else {
    res.sendStatus(401);
  }
});

// ADD THIS ROUTE FOR TOKEN REFRESH
router.post('/token', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);
  
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  });
});

module.exports = router;