const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *  security:
 *  - OAuth2: [email, profile]
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * 
 *      401:
 *       description: Unauthorized user
 *       500:
 *         description: Server error
 */
router.get('/', authMiddleware.ensureAuthenticated, userController.getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *  security:
 * - OAuth2: [email, profile]
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *     401:
 *       description: Unauthorized user
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware.ensureAuthenticated, userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 * security:
 * - OAuth2: [email, profile]
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *      401:
 *       description: Unauthorized user     
 *  404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware.ensureAuthenticated, userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 * security:
 * - OAuth2: [email, profile]
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *        401:
 *        description: Unauthorized user
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware.ensureAuthenticated, userController.deleteUser);

module.exports = router;