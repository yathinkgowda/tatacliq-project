const express = require('express');
const router = express.Router();
const Product = require('../Modules/product');

// Add new product
router.post('/add-product', async (req, res) => {
  try {
    const {
      name,
      category,
      oldprice,
      newPrice,
      image,
      brand,
      stock,
      description,
      color,
      shippingArea,
    } = req.body;

    // Validate required fields
    if (!name || !category || !oldprice || !newPrice) {
      return res.status(400).json({
        error: 'Name, category, old price, and new price are required fields',
      });
    }

    // Parse prices to ensure they're valid numbers
    const parsedOldPrice = parseFloat(oldprice);
    const parsedNewPrice = parseFloat(newPrice);

    if (isNaN(parsedOldPrice) || isNaN(parsedNewPrice)) {
      return res.status(400).json({ error: 'Prices must be valid numbers' });
    }

    // Create new product object
    const product = new Product({
      name,
      category,
      brand,
      stock,
      description,
      color,
      shippingArea,
      oldprice: parsedOldPrice,
      newPrice: parsedNewPrice,
      image: image || '', // Optional field
    });

    // Save product to the database
    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product: savedProduct,
    });
  } catch (error) {
    console.error('Error adding product:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({
      error: 'Failed to add product',
      details: error.message,
    });
  }
});




// Get all products
// router.get('/products', async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       products
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: 'Failed to fetch products',
//       details: error.message
//     });
//   }
// });

module.exports = router;