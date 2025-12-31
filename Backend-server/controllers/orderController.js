const Order = require('../models/Order')

/* ================= USER ================= */

// CREATE ORDER (CHECKOUT)
exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body

    const order = await Order.create({
      userId: req.user.id,
      items,
      totalPrice,
      status: 'pending'
    })

    res.status(201).json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create order', error })
  }
}

// GET USER ORDERS
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user orders' })
  }
}

/* ================= ADMIN ================= */

// ALL ORDERS
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' })
  }
}

// ABANDONED ORDERS
exports.getAbandonedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'abandoned' })
      .populate('userId', 'name email')

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch abandoned orders' })
  }
}

// DRAFT ORDERS
exports.getDraftOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'draft' })
      .populate('userId', 'name email')

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch draft orders' })
  }
}

// UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order' })
  }
}
