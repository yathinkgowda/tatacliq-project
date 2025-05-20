import React from 'react';
import { useLocation } from 'react-router-dom';
// import './PaymentPage.css';

const OrderSuccess = () => {
  const { state } = useLocation();
  const orderDetails = state?.orderDetails;

  return (
    <div className="payment-container">
      <div className="success-animation">
        <div className="checkmark-circle">
          <div className="background"></div>
          <div className="checkmark">✔</div>
        </div>
        <h2>Order Placed Successfully!</h2>
        <h5>Thank you for your purchase</h5>
        
        {orderDetails && (
          <div className="order-details">
            <h4>Order Details</h4>
            <p>Order ID: {orderDetails.orderId}</p>
            <p>Payment Method: {orderDetails.paymentMethod.toUpperCase()}</p>
            <p>Total Amount: ₹{orderDetails.totalAmount.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSuccess;