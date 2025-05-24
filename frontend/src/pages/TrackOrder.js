import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MainNavbar from '../components/MainNavbar'; // Make sure this path is correct
import { useDispatch } from 'react-redux';
import setCurrentProduct from '../actions/setCurrentProduct';
import { Button } from 'react-bootstrap';

const TrackOrder = () => {
    const Email = localStorage.getItem('userEmail') ;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const dispatch = useDispatch();
    const handleCurrentProduct = (order) => {
    dispatch(setCurrentProduct(order?.items[0]));
  };
console.log(orders,"ordersordersordersorders")
const userEmail = Email;

const filteredOrders = orders.filter(order =>
  order.items.some(item => item.email === userEmail)
);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4500/api/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-IN', options).replace(/ /g, ' ');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <MainNavbar />
        <div className="spinner"></div>
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
      <>
        <MainNavbar />
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
      </>
    );
  }

  return (
    <div className="order-list-container">
      <MainNavbar />
      
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="page-title"
      >
        YOUR ORDERS
      </motion.h1>
      
      <div className="orders-container">
        {filteredOrders?.map((order, index) => (
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
              {console.log(order,"orderorderorder")}
              <div className="order-id">ORDER #{order._id?.slice(-6).toUpperCase()}</div>
              <div className="order-status delivered">
                {/* DELIVERED */}
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
                  <div className="product-section">
                    <div className="product-image-container">
                      <img 
                        src={order.items?.[0]?.imageUrl || order.items?.[0]?.image} 
                        alt="Product" 
                        className="product-image"
                      />
                    </div>
                    <div className="product-details">
                      <div className="product-brand"> {order.items?.[0]?.name}</div>
                      <div className="product-name">Brand - {order.items?.[0]?.brand}</div>
                      <div className="product-name">Size - {order.items?.[0]?.size}</div>
                      <div className="product-name">quantity - {order.items?.[0]?.quantity}</div>

                      <div className="price-section">
                        <div className="price-row">
                          {/* <span>{order.items?.[0]?.newPrice}</span> */}
                          <span className="price-note">(Includes Convenience Fee)</span>
                        </div>
                        <div className="savings-row">
                          Total- {order.items?.[0]?.total_item_price}
                        </div>
                      </div>

                      <div className="button-group">
                        <Link onClick={()=>handleCurrentProduct(order)} to={`/details`}>
                          <Button>View Details</Button>
                        </Link>
                        <Link to={`/Viewtrack/${order._id}`}>
                          <Button variant="outline-primary" className="ml-2">Track Order</Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="address-section">
                    <h3 className="section-title">Shipping Address</h3>
                    {order.address && (
                      <div className="address-details">
                        <p>{order.address.address}</p>
                        <p>
                          {order.address.city}, {order.address.locality} - {order.address.pincode}
                        </p>
                        <p>Phone: {order.address.phone}</p>
                      </div>
                    )}
                  </div>

                  <div className="timeline-section">
                    <div className="timeline-title">Delivered on Wed, 26 Mar</div>
                    <div className="timeline-steps">
                      {/* Timeline steps remain same */}
                    </div>
                  </div>

                  <div className="return-section">
                    <div className="return-text">
                      Return/Exchange window closed on Wednesday, 02 April
                    </div>
                    <button className="return-policy">
                      Return Policy
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        :root {
          --primary-color: #2d3436;
          --secondary-color: #636e72;
          --accent-color: #0984e3;
          --success-color: #00b894;
          --error-color: #d63031;
          --border-color: #dfe6e9;
          --background-light: #f9f9f9;
          --shadow-light: 0 2px 15px rgba(0, 0, 0, 0.1);
          --radius-md: 8px;
          --radius-sm: 4px;
          --transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          background-color: var(--background-light);
          color: var(--primary-color);
        }

        .loading-container,
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          text-align: center;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid var(--border-color);
          border-top-color: var(--accent-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1.5rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .error-card {
          background: white;
          padding: 2rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-light);
          max-width: 500px;
          width: 100%;
        }

        .retry-button {
          background: var(--accent-color);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          margin-top: 1rem;
        }

        .order-list-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 2rem;
          text-align: center;
        }

        .order-card {
          background: white;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-light);
          margin-bottom: 1.5rem;
          overflow: hidden;
          transition: var(--transition);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .order-id {
          font-weight: 600;
          color: var(--accent-color);
        }

        .order-status {
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          background: var(--success-color);
          color: white;
        }

        .expand-icon {
          font-size: 0.75rem;
          color: var(--secondary-color);
          transition: var(--transition);
        }

        .order-details-container {
          padding: 0 1.5rem;
        }

        .product-section {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .product-image {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: var(--radius-sm);
        }

        .product-brand {
          font-size: 0.875rem;
          color: var(--secondary-color);
          margin-bottom: 0.25rem;
        }

        .product-name {
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .price-section {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: var(--radius-sm);
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .price-note {
          font-size: 0.75rem;
          color: var(--secondary-color);
          font-weight: 400;
        }

        .savings-row {
          color: var(--success-color);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .button-group {
          display: flex;
          gap: 10px;
          margin-top: 1rem;
        }

        .address-section {
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .section-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .return-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
        }

        .view-details-button {
          display: inline-block;
          background: var(--accent-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
          font-weight: 600;
          margin-top: 1rem;
          transition: var(--transition);
        }

        @media (max-width: 768px) {
          .order-list-container {
            padding: 1rem;
          }

          .product-section {
            grid-template-columns: 1fr;
          }

          .product-image {
            height: 200px;
          }

          .button-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default TrackOrder;
















