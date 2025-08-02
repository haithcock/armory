// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../config/authMiddleware'); 

router.use(isAuthenticated, isAdmin);
// Apply validation middleware to POST/PUT routes
router.get('/', userController.getAllUsers);
router.post(
  '/',
  userController.userValidationRules,
  userController.validateUser,
  userController.createUser
);
router.put(
  '/:id',
  userController.userValidationRules,
  userController.validateUser,
  userController.updateUser
);
router.delete('/:id', userController.deleteUser);

module.exports = router; 