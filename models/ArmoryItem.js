// models/ArmoryItem.js
const mongoose = require('mongoose');

const armoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  caliber: { type: String, required: true },
  type: { type: String, required: true },
  manufacturer: { type: String, required: true },
  round_count: { type: Number, required: true, min: 0 },
  last_cleaned: { type: Date, required: true },
  notes: { type: String }
}, {
  timestamps: false
});

module.exports = mongoose.model('ArmoryItem', armoryItemSchema, 'armory');