// armoryRoutes.js
const express = require('express');
const router = express.Router();
const armoryController = require('../controllers/armoryController');
const { isAuthenticated } = require('../config/authMiddleware');

router.get('/', armoryController.getAllItems);
router.post('/', isAuthenticated, armoryController.itemValidationRules);


// Apply validation middleware to POST/PUT routes
router.get('/', armoryController.getAllItems);
router.post(
  '/',
  isAuthenticated,
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
router.delete(
  '/:id',
  isAuthenticated,
  armoryController.deleteItem
);
module.exports = router;