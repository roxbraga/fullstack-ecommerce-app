const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ''
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    category: {
      type: String,
      required: true,
      index: true
    },

    image: {
      type: String,
      default: ''
    },

    // 🔥 CURRENT AVAILABLE STOCK
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },

    // 🔥 TOTAL ORDERS FOR THIS PRODUCT (ACCUMULATED)
    totalOrders: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Product', productSchema)
