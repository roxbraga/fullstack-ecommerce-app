const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const { verify, verifyAdmin } = require("../auth");

// Public endpoint for active products
router.get('/', productController.getActiveProducts);

// Admin-only endpoints
router.get('/all', verify, verifyAdmin, productController.getAllProducts);
router.post('/', verify, verifyAdmin, productController.createProduct);
router.patch('/:id', verify, verifyAdmin, productController.updateProduct);
router.patch('/:id/archive', verify, verifyAdmin, productController.archiveProduct);
router.post("/search/price-range", productController.searchByPriceRange);
router.get("/specific/:id", productController.getProduct);

module.exports = router;
