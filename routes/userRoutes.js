
const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes for user CRUD
router.get('/', authenticateToken, getUsers);
router.post('/', createUser);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);

module.exports = router;
