// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const ArmoryItem = require('./models/ArmoryItem');
const userRoutes = require('./routes/userRoutes');
const armoryRoutes = require('./routes/armoryRoutes');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');


app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());

app.use(passport.session());

require('./config/passport'); 

app.use('/auth', authRoutes);

//test
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/users', userRoutes);

app.use('/armory', armoryRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true, // Enable explorer
  swaggerOptions: {
    persistAuthorization: true, // Keep auth between refreshes
    tryItOutEnabled: true, // Enable "Try it out" feature
    oauth: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      scopes: ['profile', 'email'],
      usePkceWithAuthorizationCodeGrant: true
    }
  }
}));

// Test route
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));