const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  address: {
    type: Object,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  deliveryCharges: {
    type: Number,
    required: true
  },
  taxes: {
    type: Number,
    required: true
  },
  grandTotal: {
    type: Number,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'completed'
  },
  date: {
    type: Date,
    default: Date.now
  }

  

});

module.exports = mongoose.model('Order', orderSchema);