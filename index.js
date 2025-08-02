// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const ArmoryItem = require('./models/ArmoryItem');
const userRoutes = require('./routes/userRoutes');
const armoryRoutes = require('./routes/armoryRoutes');
const app = express();
app.use(express.json());
//test
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users', userRoutes);
app.use('/api/armory', armoryRoutes);

// Test route
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));