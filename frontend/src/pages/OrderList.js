
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleStatusChange = async (orderId, itemId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:4500/api/orders/${orderId}/items/${itemId}`,
        { status: newStatus }
      );

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? response.data : order
        )
      );
    } catch (err) {
      console.error('Status update failed:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4500/api/orders');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="futuristic-spinner">
          <div className="spinner-sector spinner-sector-red"></div>
          <div className="spinner-sector spinner-sector-blue"></div>
          <div className="spinner-sector spinner-sector-green"></div>
        </div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="loading-text"
        >
          LOADING ORDER DATA...
        </motion.h2>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="error-container"
      >
        <div className="error-card">
          <h2>ERROR</h2>
          <p>{error}</p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              setTimeout(() => window.location.reload(), 500);
            }}
            className="retry-button"
          >
            RETRY CONNECTION
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="order-list-container">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="page-title"
      >
        ORDER MANAGEMENT
      </motion.h1>

      <div className="summary-cards">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="summary-card total-orders"
        >
          <h3>TOTAL ORDERS</h3>
          <p>{orders.length}</p>
        </motion.div>

        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="summary-card total-revenue"
        >
          <h3>TOTAL REVENUE</h3>
          <p>₹{orders.reduce((sum, order) => sum + (order.grandTotal || 0), 0).toLocaleString('en-IN')}</p>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="summary-card pending-orders"
        >
          <h3>COMPLETED ORDERS</h3>
          <p>{orders.filter(order => order.status === 'delivered').length}</p>
        </motion.div>
      </div>

      <div className="orders-container">
        {orders.map((order, index) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="order-card"
          >
            <div
              className="order-header"
              onClick={() => toggleOrderExpand(order._id)}
              role="button"
              tabIndex={0}
            >
              <div className="order-id">ORDER #{order._id?.slice(-6).toUpperCase()}</div>
              <div className="order-date">{new Date(order.date).toLocaleDateString('en-IN')}</div>
              <div className="order-amount">₹{order.grandTotal?.toLocaleString('en-IN')}</div>
              <div className={`order-status ${order.status}`}>
                {order.status.toUpperCase()}
              </div>
              <motion.div
                animate={{ rotate: expandedOrder === order._id ? 180 : 0 }}
                className="expand-icon"
              >
                ▼
              </motion.div>
            </div>

            <AnimatePresence>
              {expandedOrder === order._id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="order-details-container"
                >
                  <div className="customer-section">
                    <h3>CUSTOMER DETAILS</h3>
                    <div className="customer-info">
                      <div className="info-item">
                        <span className="info-label">Name:</span>
                        <span className="info-value">
                          {order.address?.firstName} {order.address?.lastName}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Phone:</span>
                        <span className="info-value">{order.address?.phone}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Address:</span>
                        <span className="info-value">
                          {order.address?.address}, {order.address?.city}, {order.address?.state} - {order.address?.pincode}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="products-section">
                    <h3>ORDER ITEMS</h3>
                    <div className="products-list">
                      {order.items?.map((item) => (
                        <div key={item._id} className="product-item">
                          <div className="product-image">
                            <img src={item.imageUrl} alt={item.name} />
                          </div>
                          <div className="product-details">
                            <div className="product-name">{item.name}</div>
                            <div className="product-brand">{item.brand}</div>
                            <div className="product-description">{item.description}</div>
                          </div>
                          <div className="product-quantity">× {item.quantity}</div>
                          <div className="product-price">
                            ₹{item.total_item_price?.toLocaleString('en-IN')}
                          </div>
                          <div className="product-status">
                            <select
                              value={item.status || 'order_received'}
                              onChange={(e) =>
                                handleStatusChange(order._id, item._id, e.target.value)
                              }
                            >
                              <option value="order_received">Order Received</option>
                              <option value="Packed">Packed</option>
                              {/* <option value="manufacturing_in_progress">Dispatched</option> */}
                              <option value="order_dispatched">Order Dispatched</option>
                              <option value="order_delivered"> Order Delivered</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="order-footer">
                    <div className="payment-method">
                      <span>Payment ID: </span>
                      <span className="method">{order.paymentId?.toUpperCase()}</span>
                    </div>
                    <div className="order-total">
                      GRAND TOTAL: ₹{order.grandTotal?.toLocaleString('en-IN')}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
  /* Global variables */
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --accent-color: #9b59b6;
  --light-gray: #f0f4f8;
  --dark-gray: #34495e;
}

/* Page Container */
.order-list-container {
  padding: 2rem;
  background: linear-gradient(135deg, #ecf0f3, #ffffff);
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  color: var(--dark-gray);
}

/* Title */
.page-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  color: var(--primary-color);
}

/* Summary Cards */
.summary-cards {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.summary-card {
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  min-width: 220px;
}

.summary-card h3 {
  font-size: 1.1rem;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
}

.summary-card p {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
}

/* Orders */
.orders-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Order Card */
.order-card {
  background: #fff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;
}

.order-card:hover {
  transform: scale(1.01);
}

/* Order Header */
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  font-weight: 500;
  flex-wrap: wrap;
  gap: 1rem;
}

.order-id,
.order-date,
.order-amount,
.order-status {
  flex: 1;
  text-align: center;
}

.order-status.delivered {
  color: #16a34a;
}

.order-status.cancelled {
  color: #e11d48;
}

/* Expand Icon */
.expand-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

/* Order Details */
.order-details-container {
  background: #f9fafc;
  padding: 1.5rem 2rem;
}

/* Customer Section */
.customer-section h3,
.products-section h3 {
  margin-bottom: 1rem;
  color: var(--accent-color);
}

.customer-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
}

.info-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
}

/* Product Section */
.products-list {
  margin-top: 1rem;
}

.product-image img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 0.5rem;
}

/* Order Footer */
.order-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

/* Loading Spinner */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: var(--light-gray);
}

.futuristic-spinner {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.spinner-sector {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  animation: bounce 1.2s infinite ease-in-out;
}

.spinner-sector-red {
  background-color: #e74c3c;
  animation-delay: 0s;
}

.spinner-sector-blue {
  background-color: #3498db;
  animation-delay: 0.2s;
}

.spinner-sector-green {
  background-color: #2ecc71;
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
  }
  40% {
    transform: scale(1.2);
  }
}

.loading-text {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-color);
}

/* Error State */
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.error-card {
  background: #fff3f3;
  border: 2px solid #e57373;
  border-radius: 1rem;
  padding: 2rem 3rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(231, 76, 60, 0.15);
}

.error-card h2 {
  color: #c0392b;
  font-size: 1.8rem;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.7rem 1.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.retry-button:hover {
  background: #c0392b;
}

    }
  }
`}</style>
    </div>
  );
};

export default OrderList;











