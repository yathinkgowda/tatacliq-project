const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../Modules/Order');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific order by ID
router.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  console.log('Received orderId:', orderId); // Confirm what’s being received

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ error: 'Invalid order ID format' });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        error: 'Order not found',
        message: `No order with ID ${orderId} exists in our system`,
      });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});




// Update individual item status inside an order
router.put('/:orderId/items/:itemId', async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId, 'items._id': itemId },
      { $set: { 'items.$.status': status } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order or item not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
