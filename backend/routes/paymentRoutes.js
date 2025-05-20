const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // ✅ Use env variable properly
const Order = require('../Modules/Order');

// Create Payment Intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, payment_method_type } = req.body;
      const amountInPaise = Math.round(Number(amount) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: [payment_method_type],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save Order
router.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Order save error:', err);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

// Add to your existing order routes
// router.get('/track', async (req, res) => {
//   try {
//     const orders = await Order.find({ 
//       status: { $in: ['confirmed', 'shipped', 'delivered'] }
//     })
//     .sort({ createdAt: -1 })
//     .populate('items.product'); // If you have product references

//     res.json(orders.map(order => ({
//       _id: order._id,
//       status: order.status,
//       items: order.items.map(item => ({
//         name: item.product?.name || 'Unknown Product',
//         description: item.product?.description || '',
//         image: item.product?.image || '',
//         price: item.price,
//         quantity: item.quantity
//       })),
//       grandTotal: order.grandTotal,
//       createdAt: order.createdAt
//     })));
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });







// Update order status


module.exports = router;