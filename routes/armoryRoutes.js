// routes/armoryRoutes.js
const express = require('express');
const router = express.Router();
const ArmoryItem = require('../models/ArmoryItem');

// GET all armory items
router.get('/', async (req, res) => {
  try {
    const items = await ArmoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Add a new armory item
router.post('/', async (req, res) => {
  try {
    const { name, caliber, type, manufacturer, round_count, last_cleaned, notes } = req.body;
    if (!name || !caliber || !type || !manufacturer || !round_count || !last_cleaned) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newItem = new ArmoryItem({ name, caliber, type, manufacturer, round_count, last_cleaned, notes });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Update an armory item by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await ArmoryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE - Remove an armory item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await ArmoryItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;