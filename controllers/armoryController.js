const ArmoryItem = require('../models/ArmoryItem');
const { body, validationResult } = require('express-validator');

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await ArmoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Validation rules for create/update
exports.itemValidationRules = [
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('caliber').optional().notEmpty().withMessage('Caliber is required'),
  body('type').optional().notEmpty().withMessage('Type is required'),
  body('manufacturer').optional().notEmpty().withMessage('Manufacturer is required'),
  body('round_count').optional().isInt({ min: 0 }).withMessage('Round count must be non-negative integer'),
  body('last_cleaned').optional().isISO8601().withMessage('Invalid date format (use ISO 8601)')
];

// Handle validation errors
exports.validateItem = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create item
exports.createItem = async (req, res) => {
  try {
    const { name, caliber, type, manufacturer, round_count, last_cleaned, notes } = req.body;
    
    // Check for duplicate name
    const existingItem = await ArmoryItem.findOne({ name });
    if (existingItem) {
      return res.status(400).json({ message: 'Item with this name already exists' });
    }

    const newItem = new ArmoryItem({ name, caliber, type, manufacturer, round_count, last_cleaned, notes });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const updates = {};
    const allowedFields = ['name', 'caliber', 'type', 'manufacturer', 'round_count', 'last_cleaned', 'notes'];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedItem = await ArmoryItem.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await ArmoryItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};