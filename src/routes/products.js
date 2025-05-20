const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Të gjithë të loguarit mund të marrin produktet
router.get('/', authMiddleware, productController.getAllProducts);
router.get('/:id', authMiddleware, productController.getProductById);

// Vetëm admin mund të krijojë, përditësojë, fshijë
router.post('/', authMiddleware, roleMiddleware(['admin']), productController.createProduct);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), productController.updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), productController.deleteProduct);

module.exports = router;
