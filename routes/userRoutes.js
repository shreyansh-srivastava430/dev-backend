// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

// ── CREATE ── (POST /api/users)
router.post('/users', authenticateToken, userController.createUser);

// ── READ ALL ── (GET /api/users)
router.get('/users', authenticateToken, userController.getAllUsers);

// ── READ ONE BY ID ── (GET /api/users/:id)
router.get('/users/:id', authenticateToken, userController.getUserById);

// ── UPDATE ── (PUT /api/users/:id)
router.put('/users/:id', authenticateToken, userController.updateUser);

// ── DELETE ── (DELETE /api/users/:id)
router.delete('/users/:id', authenticateToken, userController.deleteUser);

module.exports = router;
