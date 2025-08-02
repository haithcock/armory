require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this at top
const session = require('express-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = express();


// Import routes
const userRoutes = require('./routes/userRoutes');
const armoryRoutes = require('./routes/armoryRoutes');
const authRoutes = require('./routes/authRoutes');

const isProduction = process.env.NODE_ENV === 'production';

// Trust proxy in production
if (isProduction) {
  app.set('trust proxy', 1);
}

// CORS Configuration - Add this before other middleware
app.use(cors({
  origin: isProduction ? process.env.CORS_ORIGIN : 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Session Configuration - Add after CORS but before passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware - Add after session
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

// Routes - Add after all middleware
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/armory', armoryRoutes);

// Swagger UI - Add with other routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    tryItOutEnabled: true,
    oauth: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      scopes: ['profile', 'email'],
      usePkceWithAuthorizationCodeGrant: true
    }
  }
}));

// Test route
app.get('/', (req, res) => res.send('API Running'));

// MongoDB Connection - Can stay at bottom
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));