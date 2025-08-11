// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const callbackURL = `${process.env.BASE_URL}${process.env.OAUTH_CALLBACK_PATH}`; // e.g., http://localhost:5000/auth/google/callback

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Minimal user object; in real apps, look up/create in DB.
      const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value || null,
        photo: profile.photos?.[0]?.value || null,
      };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;
