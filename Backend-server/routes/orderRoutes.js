const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const { verify, verifyAdmin } = require("../auth");

// USER
router.post('/', verify, orderController.createOrder)
router.get('/my', verify, orderController.getUserOrders)

// ADMIN
router.get('/all', verify, verifyAdmin, orderController.getAllOrders)
router.get('/abandoned', verify, verifyAdmin, orderController.getAbandonedOrders)
router.get('/draft', verify, verifyAdmin, orderController.getDraftOrders)
router.patch('/:id', verify, verifyAdmin, orderController.updateOrderStatus)
router.delete('/:id', verify, verifyAdmin, orderController.deleteOrder)
router.patch('/:id/cancel', verify, orderController.cancelOrder)


module.exports = router

