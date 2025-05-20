import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Footer1.css';

const Footer = () => {
  const offeringsColumns = [
    [
      'Watches for Men', 'Campus Shoes', 'Sandals for Men', 'Sneakers for Men',
      'Reebok Shoes', 'Cotton Kurtis', 'Woodland Shoes', 'Jumpcutts', 'Allen Sally'
    ],
    [
      'Spanx Shoes', 'Gold Rings', 'Formal Shoes for Men', 'Sports Shoes for Men',
      'Wallets for Men', 'Ladies Watches', 'Trolley Bags', 'Handbags for Women',
      'Sling Bags for Women'
    ],
    [
      'Casual Shoes for Men', 'Boots for Men', 'Digital Watches', 'Sonata Watches',
      'Sneakers for Women', 'Running Shoes', 'Puma Shoes', 'Boots for Women', 'Skechers'
    ],
    [
      'Malsbargold', 'Fakindia', 'Utsa', 'Vark', 'Gia', 'LOV', 'Stigmap'
    ]
  ];

  return (
    <div className="footer-wrapper">
      <div className="footer-top text-center py-4 border-bottom border-gray">
        <div className="d-flex justify-content-center gap-4">
          <div className="text-center px-3">
            <i className="bi bi-shield-check fs-5 text-dark"></i>
            <div className="mt-1 small">Authentic Brands</div>
          </div>
          <div className="text-center px-3">
            <i className="bi bi-arrow-repeat fs-5 text-dark"></i>
            <div className="mt-1 small">Easy Returns</div>
          </div>
          <div className="text-center px-3">
            <i className="bi bi-credit-card fs-5 text-dark"></i>
            <div className="mt-1 small">Easy Payments</div>
          </div>
        </div>
      </div>

      <div className="container-fluid footer-main py-5">
        <div className="row gx-5">
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3 text-uppercase small">Tata MarketPlace</h6>
            {['About Us', 'Careers', 'Terms of Use', 'Privacy Policy', 'Affiliates', 'Stigmap'].map((item, idx) => (
              <a key={idx} href="#" className="d-block mb-2 footer-link small">{item}</a>
            ))}
          </div>
          
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3 text-uppercase small">Customer Service</h6>
            {[
              'Shopping', 'Offers & Promotions', 'Payments', 'Cancellation',
              'Returns & Refunds', 'OIQ And PIO', 'Returns Policy',
              'Electronics Return Policy', 'Contact Us'
            ].map((item, idx) => (
              <a key={idx} href="#" className="d-block mb-2 footer-link small">{item}</a>
            ))}
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3 text-uppercase small">My Tata CLiQ</h6>
            {['My Account', 'My Orders', 'My Shopping Bag', 'My Wishlist'].map((item, idx) => (
              <a key={idx} href="#" className="d-block mb-2 footer-link small">{item}</a>
            ))}
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold mb-3 text-uppercase small">Tata CLiQ Offerings</h6>
            <div className="row gx-4">
              {offeringsColumns.map((column, colIdx) => (
                <div key={colIdx} className="col-3">
                  {column.map((item, idx) => (
                    <a key={idx} href="#" className="d-block mb-2 footer-link small">{item}</a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;