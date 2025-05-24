
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { addToCart } from '../actions/cartAction';

// const ProductDetails = ({ product }) => {
//   const [mainImage, setMainImage] = useState(product?.image);
//   const [selectedSize, setSelectedSize] = useState('L');
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const MAX_STOCK = 5;

//   const handleAddToCart = () => {
//     if (quantity > MAX_STOCK) {
//       alert(`Only ${MAX_STOCK} items available in stock!`);
//       return;
//     }

//     const cartItem = {
//       ...product,
//       size: selectedSize,
//       quantity: quantity
//     };

//     dispatch(addToCart(cartItem));
//     navigate('/cart');
//   };

//   const handleQuantityChange = (e) => {
//     let value = parseInt(e.target.value) || 1;
//     value = Math.max(1, Math.min(MAX_STOCK, value));
//     setQuantity(value);
//   };

//   return (
//     <div className="container my-5">
//       <div className="row g-4 shadow p-4">
//         {/* Left: Image Section */}
//         <div className="col-md-6 text-center">
//           <img
//             src={mainImage}
//             alt="Main"
//             className="img-fluid rounded"
//             style={{ maxHeight: 400 }}
//           />
//           <div className="mt-3">
//             <img
//               src={product?.image}
//               alt="Thumbnail"
//               className="img-thumbnail"
//               style={{ width: 80, cursor: 'pointer' }}
//               onClick={() => setMainImage(product?.image)}
//             />
//           </div>
//         </div>

//         {/* Right: Product Details Section */}
//         <div className="col-md-6">
//           <h2>{product?.name}</h2>
//           <a href="#" className="d-block mb-2 text-decoration-none">Visit Store</a>

//           <div className="mb-3">
//             <span className="text-warning">
//               <i className="fas fa-star" />
//               <i className="fas fa-star" />
//               <i className="fas fa-star" />
//               <i className="fas fa-star" />
//               <i className="fas fa-star-half-alt" />
//             </span>
//             <span className="ms-2">4.7 (21)</span>
//           </div>

//           <div className="mb-3">
//             <p className="fw-bold text-success">
//               New Price: ${product?.newPrice}
//             </p>
//             <p className="mb-1 text-muted">
//               Old Price: <del>${product?.oldPrice}</del>
//             </p>
//           </div>

//           <div className="mb-3">
//             <h5>About this item:</h5>
//             <p>{product?.description || 'High-quality product with premium design.'}</p>
//             <ul className="list-unstyled">
//               <li>Color: <strong>{product?.color}</strong></li>
//               <li>Available: <strong>{MAX_STOCK} {product?.stock}</strong></li>
//               <li>Category: <strong>{product?.category}</strong></li>
//               <li>Shipping Area: <strong>{product?.shippingArea}</strong></li>
//             </ul>
//           </div>

//           {/* Size Selection */}
//           <div className="mb-4">
//             <h5>Select Size:</h5>
//             <div className="d-flex gap-2 flex-wrap">
//               {/* {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`btn ${
//                     selectedSize === size 
//                     ? 'btn-primary' 
//                     : 'btn-outline-secondary'
//                   }`}
//                   style={{ minWidth: '60px' }}
//                 >
//                   {size}
//                 </button>
//               ))} */}
//             </div>
//           </div>

//           {/* Quantity Selection */}
//           <div className="mb-4">
//             <h5>Select Quantity:</h5>
//             <div className="d-flex align-items-center gap-3">
//               <input
//                 type="number"
//                 min="1"
//                 max={MAX_STOCK}
//                 value={quantity}
//                 onChange={handleQuantityChange}
//                 className="form-control"
//                 style={{ width: '100px' }}
//               />
//               <span className="text-muted small">
//                 (Maximum {MAX_STOCK} per order)
//               </span>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="mb-4 d-flex align-items-center gap-3">
//             <button 
//               className="btn btn-primary px-4 py-2" 
//               onClick={handleAddToCart}
//             >
//               <i className="fas fa-shopping-cart me-2" />
//               Add to Cart
//             </button>
//             <button className="btn btn-outline-secondary px-4 py-2">
//               Compare
//             </button>
//           </div>

//           {/* Social Sharing */}
//           <div className="border-top pt-4">
//             <p className="text-muted">Share this product:</p>
//             <div className="d-flex gap-3">
//               <a href="#" className="text-dark">
//                 <i className="fab fa-facebook-f fa-lg" />
//               </a>
//               <a href="#" className="text-dark">
//                 <i className="fab fa-twitter fa-lg" />
//               </a>
//               <a href="#" className="text-dark">
//                 <i className="fab fa-instagram fa-lg" />
//               </a>
//               <a href="#" className="text-dark">
//                 <i className="fab fa-whatsapp fa-lg" />
//               </a>
//               <a href="#" className="text-dark">
//                 <i className="fab fa-pinterest fa-lg" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { addToCart } from '../actions/cartAction';
import { Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';

const ProductDetails = ({ product }) => {
  const [mainImage, setMainImage] = useState(product?.image);
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [showStockAlert, setShowStockAlert] = useState(false);
  const [stock, setStock] = useState(null); // Stock will be fetched from backend
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Simulate fetching stock from backend
  useEffect(() => {
    // This is a placeholder for actual API call to fetch stock
    const fetchStock = async () => {
      try {
        // Simulated API response (replace with actual API call)
        const response = await new Promise(resolve => 
          setTimeout(() => resolve({ stock: 7 }), 500)
        );
        setStock(response.stock);
      } catch (error) {
        console.error('Error fetching stock:', error);
        setStock(0); // Fallback to 0 if API call fails
      }
    };
    fetchStock();
  }, []);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;

    // Maximum quantity limit set to 6
    const maxQuantity = Math.min(5, stock || 0);

    if (newQuantity > maxQuantity) {
      setShowStockAlert(true);
      setQuantity(maxQuantity);
    } else {
      setShowStockAlert(false);
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (stock <= 0) {
      setShowStockAlert(true);
      return;
    }

    const cartItem = {
      ...product,
      size: selectedSize,
      quantity: quantity,
      totalPrice: product?.newPrice * quantity
    };

    dispatch(addToCart(cartItem));
    
    // Update stock after adding to cart (would typically be handled by backend)
    setStock(prev => prev - quantity);
    
    // Reset quantity and alert after adding to cart
    setQuantity(1);
    setShowStockAlert(false);
    // navigate('/cart');
  };

  return (
    <div className="container my-5">
      <div className="row g-4 shadow p-4">
        {/* Left: Image Section */}
        <div className="col-md-6 text-center">
          <img
            src={mainImage}
            alt="Main"
            className="img-fluid rounded"
            style={{ maxHeight: 400 }}
          />
          <div className="mt-3">
            <img
              src={product?.image}
              alt="Thumbnail"
              className="img-thumbnail"
              style={{ width: 80, cursor: 'pointer' }}
              onClick={() => setMainImage(product?.image)}
            />
          </div>
        </div>

        {/* Right: Product Details Section */}
        <div className="col-md-6">
          <h2>{product?.name}</h2>
          <a href="#" className="d-block mb-2 text-decoration-none">Visit Store</a>

          <div className="mb-3">
            <span className="text-warning">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star-half-alt" />
            </span>
            <span className="ms-2">4.7 (21)</span>
          </div>

          <div className="mb-3">
            <p className="fw-bold text-success">
              New Price: ${product?.newPrice}
            </p>
            <p className="mb-1 text-muted">
              Old Price: <del>${product?.oldPrice}</del>
            </p>
          </div>

          <div className="mb-3">
            <h5>About this item:</h5>
            <p>{product?.description || 'High-quality product with premium design.'}</p>
            <ul className="list-unstyled">
              <li>Color: <strong>{product?.color}</strong></li>
              <li>Available Stock: <strong>{stock ?? 'Loading...'}</strong></li>
              <li>Category: <strong>{product?.category}</strong></li>
              <li>Shipping Area: <strong>{product?.shippingArea}</strong></li>
            </ul>
          </div>

          {/* Stock Alert */}
          {showStockAlert && (
            <Alert 
              variant="warning" 
              dismissible 
              onClose={() => setShowStockAlert(false)}
            >
              {stock <= 0 ? 'No items available!' : `Maximum ${Math.min(6, stock)} items can be added!`}
            </Alert>
          )}

          {/* Size Selection */}
          <div className="mb-4">
  <h5>Select Size:</h5>
  <div className="d-flex gap-2 flex-wrap">
    {
      // Clothing categories
      ['Ethnic Wear', 'Casual Wear', 'Top', 'Bottom', 'Activewear', 'Girls Clothing', 'Boys Clothing'].includes(product?.category) ?
        ['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`btn ${
              selectedSize === size 
                ? 'btn-primary' 
                : 'btn-outline-secondary'
            }`}
            style={{ minWidth: '60px' }}
            disabled={stock <= 0}
          >
            {size}
          </button>
        )) :
      // Footwear categories
      ['Sandles', 'Shoes', 'FlipFlop'].includes(product?.category) ?
        ['6', '7', '8', '9', '10', '11'].map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`btn ${
              selectedSize === size 
                ? 'btn-primary' 
                : 'btn-outline-secondary'
            }`}
            style={{ minWidth: '60px' }}
            disabled={stock <= 0}
          >
            {size}
          </button>
        )) :
      // No sizes for other categories
      null
    }
  </div>
</div>

          {/* Quantity Selection */}
          <div className="mb-4">
            <h5>Select Quantity:</h5>
            <div className="d-flex align-items-center gap-3">
              <InputGroup style={{ width: '180px' }}>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={stock <= 0 || quantity <= 1}
                >
                  <FaMinus />
                </Button>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  min="1"
                  max={Math.min(6, stock || 0)}
                  className="text-center"
                  disabled={stock <= 0}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={stock <= 0 || quantity >= Math.min(6, stock || 0)}
                >
                  <FaPlus />
                </Button>
              </InputGroup>
              {stock <= 0 && (
                <span className="text-danger small">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-4 d-flex align-items-center gap-3">
            <button 
              className="btn btn-primary px-4 py-2" 
              onClick={handleAddToCart}
              disabled={stock <= 0}
            >
              <i className="fas fa-shopping-cart me-2" />
              {stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button 
              className="btn btn-outline-secondary px-4 py-2"
              disabled={stock <= 0}
            >
              Compare
            </button>
          </div>

          {/* Social Sharing */}
          <div className="border-top pt-4">
            <p className="text-muted">Share this product:</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-dark">
                <i className="fab fa-facebook-f fa-lg" />
              </a>
              <a href="#" className="text-dark">
                <i className="fab fa-twitter fa-lg" />
              </a>
              <a href="#" className="text-dark">
                <i className="fab fa-instagram fa-lg" />
              </a>
              <a href="#" className="text-dark">
                <i className="fab fa-whatsapp fa-lg" />
              </a>
              <a href="#" className="text-dark">
                <i className="fab fa-pinterest fa-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        .btn-primary {
          background-color: #a000c8;
          border-color: #a000c8;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(160, 0, 200, 0.2);
        }
        .btn-primary:disabled {
          background-color: #ccc;
          border-color: #ccc;
        }
        .quantity-input-group {
          width: 180px;
          margin: 0 auto;
        }
        .quantity-input-group .btn {
          background: white;
          border: 1px solid #ddd;
          color: #a000c8;
          font-weight: bold;
        }
        .quantity-input-group .btn:hover {
          background: #f0f0f0;
        }
        .quantity-input-group .form-control {
          text-align: center;
          font-weight: bold;
          border-left: none;
          border-right: none;
          background: white;
        }
        .alert-warning {
          background: #fff3cd;
          border: none;
          border-radius: 8px;
          color: #856404;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .alert-warning .close {
          color: #856404;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;