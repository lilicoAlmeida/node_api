
const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes for product CRUD
router.get('/', authenticateToken, getProducts);
router.post('/', createProduct);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;
