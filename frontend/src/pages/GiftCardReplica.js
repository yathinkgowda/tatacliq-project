import React from 'react';

const GiftCard = () => {
  return (
    <div className="main-container">
      <style>{`
        .main-container {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 550px;
          background: linear-gradient(135deg, #e0f7fa 0%, #b3e5fc 100%);
          font-family: Arial, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .shape-left, .shape-right {
          position: absolute;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          filter: blur(50px);
        }
        .shape-left {
          width: 300px;
          height: 400px;
          left: -100px;
          top: 0;
        }
        .shape-right {
          width: 300px;
          height: 400px;
          right: -100px;
          bottom: 0;
        }

        .sparkle {
          position: absolute;
          width: 10px;
          height: 10px;
          background: none;
          border: 2px solid;
          transform: rotate(45deg);
        }
        .sparkle1 { top: 20px; left: 50px; border-color: #ff4081; }
        .sparkle2 { top: 100px; left: 200px; border-color: #42a5f5; }
        .sparkle3 { bottom: 50px; left: 150px; border-color: #ff4081; }
        .sparkle4 { top: 50px; right: 100px; border-color: #42a5f5; }

        .top-left-text {
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 24px;
          font-weight: bold;
          color: #000;
        }
        .top-right-text {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 16px;
          font-weight: bold;
          color: #ff4081;
          display: flex;
          align-items: center;
        }
        .top-right-text::before {
          content: "★";
          margin-right: 5px;
          color: #ff4081;
        }

        .gift-card {
          width: 350px;
          height: 200px;
          background: #000;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          position: relative;
          color: #fff;
          text-align: center;
          padding: 20px;
          overflow: hidden;
        }

        .gift-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="2" fill="white"/></svg>') repeat;
          opacity: 0.1;
        }

        .gift-card h1 {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .gift-card p {
          margin: 0;
          font-size: 16px;
          font-style: italic;
          margin-bottom: 20px;
        }

        .logos {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 20px;
        }
        .logo {
          font-size: 14px;
          font-weight: bold;
        }
        .logo span {
          color: #ff4081;
        }
        .logo.italic {
          font-style: italic;
        }
        .logo-heart::before {
          content: "❤️";
          margin-right: 5px;
        }
      `}</style>

      <div className="shape-left"></div>
      <div className="shape-right"></div>
      <div className="sparkle sparkle1"></div>
      <div className="sparkle sparkle2"></div>
      <div className="sparkle sparkle3"></div>
      <div className="sparkle sparkle4"></div>

      <div className="top-left-text">And it's here</div>
      <div className="top-right-text">Back to CLIQ Cash</div>

      <div className="gift-card">
        <h1>GIFT CARD</h1>
        <p>Licence to Indulge</p>
        <div className="logos">
          <div className="logo">TATA CLI<span>Q</span> FASHION</div>
          <div className="logo">TATA CLI<span>Q</span> LUXURY</div>
          <div className="logo logo-heart">TATA CLIQ palette</div>
          <div className="logo italic"><span>Q</span>wickCilver</div>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;