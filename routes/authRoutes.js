const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.redirect(`/api-docs?token=${token}`);
  }
);

module.exports = router;