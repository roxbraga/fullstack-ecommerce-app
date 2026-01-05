const Product = require('../models/Product');

// ADMIN GUARD
function ensureAdmin(req, res) {
  if (!req.user || !req.user.isAdmin) {
    res.status(403).json({ message: 'Admin access only' });
    return false;
  }
  return true;
}

// ================= PUBLIC =================

// GET ACTIVE PRODUCTS
module.exports.getActiveProducts = async function(req, res) {
  try {
    const products = await Product.find({ isActive: true });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};

// GET SINGLE PRODUCT
module.exports.getProduct = async function(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || (!product.isActive && (!req.user || !req.user.isAdmin))) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product', error: err.message });
  }
};

// SEARCH BY PRICE RANGE
module.exports.searchByPriceRange = async function(req, res) {
  try {
    const { minPrice, maxPrice } = req.body;
    const query = {};

    if (minPrice !== undefined) query.price = { $gte: minPrice };
    if (maxPrice !== undefined) query.price = { ...query.price, $lte: maxPrice };

    const products = await Product.find(query);

    res.status(200).json({
      message: 'Products retrieved successfully',
      count: products.length,
      products
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ================= ADMIN =================

// GET ALL ACTIVE PRODUCTS (ADMIN DASHBOARD)
module.exports.getAllProducts = async function(req, res) {
  if (!ensureAdmin(req, res)) return;

  try {
    //  ACTIVE ONLY
    const products = await Product.find({ isActive: true });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};

//  GET ARCHIVED PRODUCTS (NEW)
module.exports.getArchivedProducts = async function(req, res) {
  if (!ensureAdmin(req, res)) return;

  try {
    const products = await Product.find({ isActive: false })
      .sort({ updatedAt: -1 });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch archived products',
      error: err.message
    });
  }
};

// CREATE PRODUCT
module.exports.createProduct = async function(req, res) {
  if (!ensureAdmin(req, res)) return;

  try {
    const { name, description, price, category, image, stock, isActive } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        message: 'Name, price, and category are required'
      });
    }

    const product = new Product({
      name,
      description: description || '',
      price,
      category,
      image: image || '',
      stock: stock ?? 0,
      quantity: 0,
      isActive: isActive ?? true
    });

    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to create product',
      error: err.message
    });
  }
};

// UPDATE PRODUCT
module.exports.updateProduct = async function(req, res) {
  if (!ensureAdmin(req, res)) return;

  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update product',
      error: err.message
    });
  }
};

// ARCHIVE PRODUCT
module.exports.archiveProduct = async function(req, res) {
  if (!ensureAdmin(req, res)) return;

  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product archived successfully',
      product
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to archive product',
      error: err.message
    });
  }
};
