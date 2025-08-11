const express = require('express');
const router = express.Router();
const armoryController = require('../controllers/armoryController');
const authMiddleware = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/auth');

/**
 * @swagger
 * /armory:
 *   get:
 *     security:
 *       - OAuth2: [email, profile]
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
 */
router.get('/', authMiddleware.ensureAuthenticated, armoryController.getAllItems);

/**
 * @swagger
 * /armory:
 *   post:
 *     security:
 *       - OAuth2: [email, profile]
 *     summary: Create a new armory item
 *     tags: [Armory]
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
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware.ensureAuthenticated, armoryController.createItem);

/**
 * @swagger
 * /armory/{id}:
 *   put:
 *     security:
 *       - OAuth2: [email, profile]
 *     summary: Update an armory item
 *     tags: [Armory]
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
 *         description: Invalid input
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware.ensureAuthenticated, armoryController.updateItem);

/**
 * @swagger
 * /armory/{id}:
 *   delete:
 *     security:
 *       - OAuth2: [email, profile]
 *     summary: Delete an armory item
 *     tags: [Armory]
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
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware.ensureAuthenticated, armoryController.deleteItem);

module.exports = router;