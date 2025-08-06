const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const jwt = require('jsonwebtoken');


const users = {}; 

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {

  users[profile.id] = {
    id: profile.id,
    username: profile.username,
    email: profile.emails?.[0]?.value || null,
  };
  return done(null, users[profile.id]);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, users[id]);
});
