const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const { verify } = require('../auth'); // JWT or session verify middleware

// Get user's cart
router.get('/', verify, cartController.getCart);

// Add item to cart
router.post('/add', verify, cartController.addToCart);

// Remove item from cart
router.delete('/remove/:productId', verify, cartController.removeFromCart);

// Clear cart
router.delete('/clear', verify, cartController.clearCart);

// Update cart
router.patch('/update', verify, cartController.updateItem)


module.exports = router;
