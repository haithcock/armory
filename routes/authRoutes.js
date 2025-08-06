const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');


router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));


router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {

    if (!req.user) return res.status(401).json({ message: 'User not found after login' });

    const token = jwt.sign(
      { id: req.user.id, username: req.user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );


    res.redirect(`/api-docs?token=${token}`);
  }
);

module.exports = router;
