// armoryRoutes.js
const express = require('express');
const router = express.Router();
const armoryController = require('../controllers/armoryController');
const { isAuthenticated } = require('../config/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Armory
 *   description: Armory item management endpoints
 */

/**
 * @swagger
 * /api/armory:
 *   get:
 *     summary: Get all armory items
 *     tags: [Armory]
 *     responses:
 *       200:
 *         description: List of armory items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArmoryItem'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', armoryController.getAllItems);

/**
 * @swagger
 * /api/armory:
 *   post:
 *     summary: Create a new armory item
 *     tags: [Armory]
 *     security:
 *       - OAuth2: ['email', 'profile']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArmoryItem'
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArmoryItem'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  '/',
  isAuthenticated,
  armoryController.itemValidationRules,
  armoryController.validateItem, 
  armoryController.createItem
);

/**
 * @swagger
 * /api/armory/{id}:
 *   put:
 *     summary: Update an armory item
 *     tags: [Armory]
 *     security:
 *       - OAuth2: ['email', 'profile']
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArmoryItem'
 *     responses:
 *       200:
 *         description: Updated item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArmoryItem'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Item not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put(
  '/:id',
  isAuthenticated,
  armoryController.itemValidationRules,
  armoryController.validateItem,
  armoryController.updateItem
);

/**
 * @swagger
 * /api/armory/{id}:
 *   delete:
 *     summary: Delete an armory item
 *     tags: [Armory]
 *     security:
 *       - OAuth2: ['email', 'profile']
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the item to delete
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item deleted successfully
 *       404:
 *         description: Item not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete(
  '/:id',
  isAuthenticated,
  armoryController.deleteItem
);

module.exports = router;