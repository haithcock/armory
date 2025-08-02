// armoryRoutes.js
const express = require('express');
const router = express.Router();
const armoryController = require('../controllers/armoryController');

// Apply validation middleware to POST/PUT routes
router.get('/', armoryController.getAllItems);
router.post(
  '/',
  armoryController.itemValidationRules,
  armoryController.validateItem,
  armoryController.createItem
);
router.put(
  '/:id',
  armoryController.itemValidationRules,
  armoryController.validateItem,
  armoryController.updateItem
);
router.delete('/:id', armoryController.deleteItem);

module.exports = router;