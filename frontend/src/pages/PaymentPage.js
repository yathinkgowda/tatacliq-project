import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/MainNavbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { address, cartItems, totalPrice, deliveryCharges, taxes, grandTotal } = location.state || {};
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [showCouponModal, setShowCouponModal] = useState(false);
    const userEmail = localStorage.getItem('userEmail') ;

  const formatPrice = (price) => `₹${price.toFixed(2)}`;
  const discountedTotal = grandTotal - (selectedCoupon?.amount || 0);
const cartItemsvalue = cartItems?.map(item => ({
  ...item,
  status: "order_received",
  email:userEmail,

}));
console.log(cartItemsvalue,"paymentIntentpaymentIntent")

  useEffect(() => {
    const availableCoupons = [];
    if (grandTotal > 1000) availableCoupons.push({ code: 'NEW100', amount: 100 });
    if (grandTotal > 3000) availableCoupons.push({ code: 'NEUCARD', amount: 500 });
    if (grandTotal > 8000) availableCoupons.push({ code: 'BIGSAVE', amount: 1000 });
    setCoupons(availableCoupons);
  }, [grandTotal]);

  if (!location.state) {
    return (
      <div className="container">
        <Navbar />
        <div className="alert alert-danger mt-5">No order information found. Please start your order again.</div>
      </div>
    );
  }

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      const orderData = {
        address,
        items: cartItemsvalue,
        totalPrice,
        deliveryCharges,
        taxes,
        grandTotal: discountedTotal,
        paymentId: paymentIntent.id,
        status: paymentIntent.status === 'requires_cod' ? 'pending' : 'completed',
        date: new Date().toISOString(),
      };

      await axios.post("http://localhost:4500/api/orders", orderData);
      setPaymentSuccess(true);
      setPaymentIntent(paymentIntent);
    } catch (err) {
      setError("Failed to save order. Please contact support.");
      console.error("Order save error:", err);
    }
  };

  return (
    <div className="container bg-white">
      <Navbar />
      <h3 className="border-bottom py-2 mb-3 mt-5">Payment</h3>
      
      <div className="row">
        <div className="col-md-7">
          <div className="card mb-4">
            <div className="card-header">
              <h5>Order Summary</h5>
            </div>
            <div className="card-body">
              {cartItems.map((item) => (
                <div key={item.id || item._id} className="d-flex mb-3 border-bottom pb-3">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    onError={(e) => (e.target.src = "/default-product.png")}
                  />
                  <div className="ms-3">
                    <h6>{item.title}</h6>
                    <p className="mb-1">Price: {formatPrice(item.newPrice)}</p>
                    <p className="mb-0">Qty: {item.quantity}</p>
                    <p className="mb-0">Size: {item.size}</p>
                  </div>
                </div>
              ))}

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between">
                  <p>Subtotal:</p>
                  <p>{formatPrice(totalPrice)}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Delivery Charges:</p>
                  <p>{formatPrice(deliveryCharges)}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Taxes:</p>
                  <p>{formatPrice(taxes)}</p>
                </div>
                {selectedCoupon && (
                  <div className="d-flex justify-content-between">
                    <p>Coupon Discount ({selectedCoupon.code}):</p>
                    <p>-{formatPrice(selectedCoupon.amount)}</p>
                  </div>
                )}
                <div className="d-flex justify-content-between fw-bold mt-2">
                  <h5>Total:</h5>
                  <h5>{formatPrice(discountedTotal)}</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <h5>Delivery Address</h5>
            </div>
            <div className="card-body">
              <p><strong>{address.firstName} {address.lastName}</strong></p>
              <p>{address.address}</p>
              <p>{address.city}, {address.state} - {address.pincode}</p>
              <p className="mb-1">Phone: {address.phone}</p>
              {address.email && <p>Email: {address.email}</p>}
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card">
            <div className="card-header">
              <h5>Payment Method</h5>
            </div>
            <div className="card-body">
              <Elements stripe={stripePromise}>
                <CheckoutForm 
                  amount={Math.round(discountedTotal * 100)}
                  onSuccess={handlePaymentSuccess}
                  setError={setError}
                  setLoading={setLoading}
                  address={address}
                  openCouponModal={() => setShowCouponModal(true)}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showCouponModal} onHide={() => setShowCouponModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Available Coupons</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {coupons.map(coupon => (
            <Button 
              key={coupon.code}
              onClick={() => {
                setSelectedCoupon(coupon);
                setShowCouponModal(false);
              }}
              className="w-100 mb-2"
              variant="outline-primary"
            >
              {coupon.code} - Save ₹{coupon.amount}
            </Button>
          ))}
          {coupons.length === 0 && <p>No coupons available for this order total.</p>}
        </Modal.Body>
      </Modal>

      <Modal show={paymentSuccess} onHide={() => navigate("/")} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {paymentIntent?.status === 'requires_cod' ? 'Order Placed!' : 'Payment Successful!'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="green" className="bi bi-check-circle-fill mb-3" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            <h4>Thank you for your order!</h4>
            {paymentIntent?.status === 'requires_cod' ? (
              <p>Your order has been placed. You will pay in cash upon delivery.</p>
            ) : (
              <p>Your payment was successful. Order details have been sent to your email.</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </Modal.Footer>
      </Modal>

      {error && (
        <div className="alert alert-danger mt-3">
          {error}
          <button type="button" className="btn-close float-end" onClick={() => setError(null)}></button>
        </div>
      )}

      {loading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50" style={{ zIndex: 9999 }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckoutForm = ({ amount, onSuccess, setError, setLoading, address, openCouponModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [vpa, setVpa] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (paymentMethod === 'cod') {
      setError(null);
      try {
        const mockPaymentIntent = {
          id: `cod_${Date.now()}`,
          status: 'requires_cod'
        };
        onSuccess(mockPaymentIntent);
      } catch (err) {
        setError("Failed to place COD order.");
      }
      setLoading(false);
      return;
    }

    if (!stripe || !elements) return;

    // setLoading(true);
    setError(null);

    try {
      const { data: { clientSecret } } = await axios.post("http://localhost:4500/api/create-payment-intent", {
        amount: amount,
        currency: "inr",
        payment_method_type: paymentMethod
      });

      let result;
      if (paymentMethod === 'card') {
        result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: `${address.firstName} ${address.lastName}`,
              email: address.email,
              address: {
                line1: address.address,
                city: address.city,
                state: address.state,
                postal_code: address.pincode
              }
            }
          }
        });
      } else if (paymentMethod === 'upi') {
        result = await stripe.confirmUpiPayment(clientSecret, {
          payment_method: {
            upi: {
              vpa: vpa
            }
          }
        });
      }

      if (result.error) {
        setError(result.error.message || "Payment failed");
        setLoading(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        onSuccess(result.paymentIntent);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.response?.data?.message || "Payment processing failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <div className="btn-group w-100" role="group">
          <button
            type="button"
            className={`btn ${paymentMethod === 'card' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setPaymentMethod('card')}
          >
            Credit/Debit Card
          </button>
          <button
            type="button"
            className={`btn ${paymentMethod === 'upi' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setPaymentMethod('upi')}
          >
            UPI
          </button>
          <button
            type="button"
            className={`btn ${paymentMethod === 'cod' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setPaymentMethod('cod')}
          >
            Cash on Delivery
          </button>
        </div>
        
        <div className="d-flex justify-content-end mt-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={openCouponModal}
          >
            Check for Coupons
          </button>
        </div>
      </div>

      {paymentMethod === 'cod' ? (
        <div className="mb-4">
          <p className="text-muted">You will pay in cash when your order is delivered.</p>
        </div>
      ) : paymentMethod === 'card' ? (
        <div className="mb-4">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#9e2146' },
              },
              hidePostalCode: true
            }}
          />
        </div>
      ) : (
        <div className="mb-4">
          <label htmlFor="vpa" className="form-label">UPI ID</label>
          <input
            type="text"
            className="form-control"
            id="vpa"
            placeholder="yourname@upi"
            value={vpa}
            onChange={(e) => setVpa(e.target.value)}
            required
          />
          <small className="text-muted">e.g. mobile@upi or name@bank</small>
        </div>
      )}

      <button 
        type="submit" 
        className="btn btn-primary w-100 py-2" 
        disabled={
          (paymentMethod !== 'cod' && !stripe) ||
          (paymentMethod === 'upi' && !vpa)
        }
      >
        {paymentMethod === 'cod' ? (
          'Place Order (COD)'
        ) : (
          `Pay ₹${(Math.round(amount) / 100).toFixed(2)}`
        )}
      </button>

      {paymentMethod !== 'cod' && (
        <div className="mt-3 text-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
            alt="Stripe" 
            style={{ height: "30px" }} 
            className="me-2"
          />
          <small className="text-muted">Secure payments powered by Stripe</small>
        </div>
      )}
    </form>
  );
};

export default PaymentPage;