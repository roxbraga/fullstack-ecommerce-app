const Cart = require('../models/cart')

// helper: always get or create cart
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ userId })
  if (!cart) {
    cart = await Cart.create({ userId, items: [] })
  }
  return cart
}

// GET CART (NO 404 EVER)
exports.getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id)
    await cart.populate('items.productId')
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ADD TO CART
exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body

  try {
    const cart = await getOrCreateCart(req.user.id)

    const item = cart.items.find(
      i => i.productId.toString() === productId
    )

    if (item) {
      item.quantity += quantity
    } else {
      cart.items.push({ productId, quantity })
    }

    await cart.save()
    await cart.populate('items.productId')

    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE QTY / SELECT
exports.updateItem = async (req, res) => {
  const { productId, quantity, selected } = req.body

  try {
    const cart = await getOrCreateCart(req.user.id)

    const item = cart.items.find(
      i => i.productId.toString() === productId
    )

    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    if (quantity !== undefined) item.quantity = quantity
    if (selected !== undefined) item.selected = selected

    await cart.save()
    await cart.populate('items.productId')

    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// REMOVE ITEM
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id)

    cart.items = cart.items.filter(
      i => i.productId.toString() !== req.params.productId
    )

    await cart.save()
    await cart.populate('items.productId')

    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// CLEAR CART
exports.clearCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id)
    cart.items = []
    await cart.save()
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
