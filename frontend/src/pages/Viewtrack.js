

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';



const Viewtrack = ({ orderId }) => {
    const { id } = useParams();
  const [currentStatus, setCurrentStatus] = useState('');
   const [orderDetails, setorderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const ordervalue = orderDetails?.items?.length > 0 ? orderDetails.items[0] : null;
console.log("orderDetailsorderDetails",ordervalue)
  const statusOrder = [
    'order_received',
    'Packed',
    'order_dispatched',
    'order_delivered'
  ];
// 'order_received',
//     'Packed',
//     'Dispatched',
//     'Out for Delivery',
//     'Delivered'
  useEffect(() => {
    const fetchStatus = async () => {

      try {
        const response = await axios.get(`http://localhost:4500/api/orders/${id}`);
        setCurrentStatus(response?.data?.items[0]?.status);
        setorderDetails(response?.data)
        setError(null);
      } catch (err) {
        const errorMessage = err.response ? 'Failed to fetch status' : err.message;
        console.error('Fetch error:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchStatus();
    
    // Set up polling
    const intervalId = setInterval(fetchStatus, 5000);
    
    // Cleanup
    return () => clearInterval(intervalId);
  }, [id]);

  const getStatusStyle = (index) => {
    if (index < currentIndex) return { backgroundColor: '#4CAF50', color: 'white' };
    if (index === currentIndex) return { backgroundColor: '#FFA500', color: 'white' };
    return { backgroundColor: '#e0e0e0', color: '#666' };
  };

  const calculateProgress = () => {
    return (currentIndex / (statusOrder.length - 1)) * 100;
  };

  const currentIndex = statusOrder.indexOf(currentStatus);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading order status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Error loading status: {error}
        </div>
      </div>
    );
  }

  if (currentIndex === -1) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          Invalid order status: {currentStatus}
        </div>
      </div>
    );
  }

  const styles = {
    container: {
      padding: '20px'
    },
    image: {
      width: '100%',
      borderRadius: '10px'
    },
    fontWeightMedium: {
      fontWeight: 500
    },
    fontWeightLight: {
      fontWeight: 300
    },
    textMuted: {
      color: '#6c757d'
    }
  };

  return (
    <div className="container" style={styles.container}>
      <div className="row mb-4">
        <div className="col-3">
          <img 
            src={ordervalue?.imageUrl} 
            alt="Gold ring with stone" 
            style={styles.image}
          />
        </div>
        <div className="col-9 d-flex flex-column justify-content-center">
          <h4 className="mb-1" style={styles.fontWeightMedium}>{ordervalue?.name}</h4>
          <h6 style={{ ...styles.textMuted, ...styles.fontWeightLight }}>description {ordervalue?.description}</h6>
          <h6 style={{ ...styles.textMuted, ...styles.fontWeightLight }}>Rs {ordervalue?.newPrice}</h6>
                    <h6 style={{ ...styles.textMuted, ...styles.fontWeightLight }}>Order ID: {ordervalue?._id}</h6>

          <h2 style={styles.fontWeightMedium}></h2>
        </div>
      </div>

      <div className="container py-4">
        <div className="card shadow">
          <div className="card-body">
            <h4 className="card-title mb-4">Order Progress</h4>

            <div className="progress mb-4" style={{ height: '20px' }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${calculateProgress()}%` }}
                aria-valuenow={calculateProgress()}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {Math.round(calculateProgress())}%
              </div>
            </div>

            <div className="row">
              {statusOrder.map((status, index) => (
                <div key={status} className="col text-center">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
                    style={{ 
                      width: '40px',
                      height: '40px',
                      ...getStatusStyle(index)
                    }}
                  >
                    {index + 1}
                  </div>
                  <div className="small">
                    {status.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}
                  </div>
                  {index === currentIndex && (
                    <div className="text-primary small mt-1">Current Status</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewtrack;