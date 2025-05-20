import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    brand: '',
   oldprice: '',
    newPrice: '',
    color: '',
    image: '',
    shippingArea: ''
  });

  // Sample categories and brands
  const categories = ['Ethnic Wear', 'Casual Wear', 'Girls Clothing', 'Boys Clothing', 'Audio','Hair Dryer','Smartwatch','Earphone',
     'Diamond Jewellers','Gold Jewellers','Silver Jewellers','FlipFlop','Sandles','Shoes','Activewear','Top','Bottom'];
  const brands = ['Biba', 'Forever New', 'WESTSIDE', 'Puma', 'Decathlon','Nike','Tanishq','GIVA','Joyalukkas','Sony','Samsung','OnePlus',
'Allen Solly Junior','Pantaloons Kids','U.S. Polo Assn. Kids','Utsa','Tommy Hilfiger','Levi\'s' ];
  const shippingAreas = ['INDIA'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4500/api/add-product', product);
      
      alert('Product added successfully!');
      setProduct({
        name: '',
        category: '',
        brand: '',
        oldprice: '',
        newPrice: '',
        color: '',
        image: '',
        shippingArea: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="admin-container">
      {/* <h2>Add New Product</h2> */}
      <img src='https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Tata_Cliq_logo.svg/130px-Tata_Cliq_logo.svg.png'/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Brand:</label>
          <select
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
          >
            <option value="">Select a brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>oldprice:</label>
          <input
            type="number"
            name="oldprice"
            value={product.oldprice}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>New Price (Discount):</label>
          <input
            type="number"
            name="newPrice"
            value={product.newPrice}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Shipping Area:</label>
          <select
            name="shippingArea"
            value={product.shippingArea}
            onChange={handleChange}
          >
            <option value="">Select shipping area</option>
            {shippingAreas.map((area, index) => (
              <option key={index} value={area}>{area}</option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
};

export default Admin;