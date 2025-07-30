const mongoose = require('mongoose');

const longarmSchema = new mongoose.Schema({
  name: String,
  caliber: String,
  type: String,
  manufacturer: String,
  round_count: Number,
  last_cleaned: Date,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Longarm', longarmSchema);
