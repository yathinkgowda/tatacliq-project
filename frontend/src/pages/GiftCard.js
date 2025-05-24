import React, { useState } from 'react';
import MainNavbar from '../components/MainNavbar';
import Footercash from './Footercash';
import Footer2 from './Footer2';
import GiftCardReplica from './GiftCardReplica';

const GiftCard = () => {
  const [showGiftCardModal, setShowGiftCardModal] = useState(false);
  const [showGiftCardReplica, setShowGiftCardReplica] = useState(false);
  const [giftCardNumber, setGiftCardNumber] = useState('');
  const [giftCardPin, setGiftCardPin] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);
  const userEmail = localStorage.getItem('userEmail') ;
  const FName = localStorage.getItem('firstName') || '';
  const menuItems = [
    { label: 'My Wishlist', icon: 'heart', path: '/wishlist' },
    { label: 'Order History', icon: 'clock', path: '/TrackOrder' },
    { label: 'NeuPass', icon: 'credit-card', path: '/neupass' },
    { label: 'Address Book', icon: 'map', path: '/addresses' },
    { label: 'Saved Payments', icon: 'credit-card', path: '/payments' },
    { label: 'Alerts & Coupons', icon: 'bell', path: '/alerts' },
  ];

  const handleAddGiftCard = () => setShowGiftCardModal(true);
  const handleCloseModal = () => setShowGiftCardModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Gift Card Submitted:', { giftCardNumber, giftCardPin });
    handleCloseModal();
  };

  const handleNavigation = (path) => {
    // Replace with your router navigation logic
    console.log('Navigating to:', path);
    window.location.href = path;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <MainNavbar />

      {showGiftCardReplica && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }} onClick={() => setShowGiftCardReplica(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <GiftCardReplica />
          </div>
        </div>
      )}

      {showGiftCardModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }} onClick={handleCloseModal}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '440px',
            height: '650px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '24px',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#2d2d2d' }}>Add Gift Card</h3>
              <button style={{ 
                background: 'none', 
                border: 'none', 
                fontSize: '24px', 
                color: '#666', 
                cursor: 'pointer', 
                padding: 0, 
                lineHeight: 1 
              }} onClick={handleCloseModal}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    color: '#2d2d2d', 
                    marginBottom: '8px', 
                    fontWeight: 500 
                  }}>
                    Gift Card Number
                  </label>
                  <input
                    type="text"
                    value={giftCardNumber}
                    onChange={(e) => setGiftCardNumber(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      fontSize: '14px',
                      color: '#2d2d2d',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    color: '#2d2d2d', 
                    marginBottom: '8px', 
                    fontWeight: 500 
                  }}>
                    Gift Card Pin
                  </label>
                  <input
                    type="text"
                    value={giftCardPin}
                    onChange={(e) => setGiftCardPin(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      fontSize: '14px',
                      color: '#2d2d2d',
                    }}
                  />
                </div>

                <p style={{ 
                  fontSize: '13px', 
                  color: '#666', 
                  lineHeight: 1.5, 
                  margin: '20px 0 0' 
                }}>
                  Your Gift Card Amount will be added to your CLIQ Cash. You can claim it at the time of checkout.
                </p>
              </div>

              <div style={{ 
                padding: '16px 24px', 
                borderTop: '1px solid #e0e0e0', 
                textAlign: 'right' 
              }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#ff3f6c',
                    color: 'white',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                >
                  Add Gift Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexGrow: 1, marginTop: '56px' }}>
        <div style={{ 
          width: '240px', 
          backgroundColor: '#fff', 
          height: 'calc(100vh - 56px)', 
          overflowY: 'auto', 
          padding: '1rem',
          borderRight: '1px solid #dee2e6'
        }}>
          <h6 style={{ 
            textTransform: 'uppercase',
            color: '#6c757d',
            marginBottom: '1rem',
            fontSize: '0.875rem',
            fontWeight: 600 
          }}>
            Menu
          </h6>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            margin: 0 
          }}>
            {menuItems.map((item, index) => (
              <li 
                key={index}
                style={{ 
                  padding: '0.5rem 0',
                  cursor: 'pointer',
                  backgroundColor: hoveredItem === index ? '#ffe5ec' : 'transparent',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleNavigation(item.path)}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#2d2d2d'
                }}>
                  <i className={`bi bi-${item.icon}`} style={{ 
                    fontSize: '16px', 
                    marginRight: '0.5rem' 
                  }}></i>
                  {item.label}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ 
          flexGrow: 1, 
          padding: '1.5rem', 
          minWidth: 0, 
          overflow: 'auto',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto'}}>
            <div style={{ 
              backgroundImage: `url('https://www.tatacliq.com/src/account/components/img/headerBg.svg ')`,
              minHeight: '450px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              padding: '2rem',
            }}>
              <h2 style={{ 
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '18rem',
                color: '#2d2d2d'
              }}>
                CLiQ Gift Card
              </h2>
              
              <button
                style={{
                  backgroundColor: '#ff3f6c',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onClick={() => setShowGiftCardReplica(true)}
              >
                Send a Gift Card
              </button>
            </div>

            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              padding: '2rem'
            }}>
              <h5 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Received a Gift Card ?</h5>

              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #dee2e6',
                paddingBottom: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1rem' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d63384" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
                      <path d="M16 2v5M8 2v5M2 11h20" />
                      <path d="M8 2c1 3 3 4 4 4s3-1 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h6 style={{ margin: 0, fontSize: '1rem' }}>Add It To Your Account</h6>
                    <p style={{ color: '#6c757d', margin: 0, fontSize: '0.875rem' }}>
                      Amount will be added to the CLIQ Cash wallet.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleAddGiftCard}
                  style={{
                    border: '1px solid #dc3545',
                    borderRadius: '50px',
                    padding: '0.25rem 1rem',
                    color: '#dc3545',
                    background: 'none',
                    cursor: 'pointer'
                  }}>
                  Add It Here
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1rem' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d63384" strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <path d="M12 18h.01" />
                      <path d="M9 8h6M9 12h6" />
                      <path d="M18 6h2M18 10h3" />
                    </svg>
                  </div>
                  <div>
                    <h6 style={{ margin: 0, fontSize: '1rem' }}>Track Your Gift Balance</h6>
                    <p style={{ color: '#6c757d', margin: 0, fontSize: '0.875rem' }}>
                      Stay updated about your gift card usage.
                    </p>
                  </div>
                </div>
                <button style={{
                  border: '1px solid #dc3545',
                  borderRadius: '50px',
                  padding: '0.25rem 1rem',
                  color: '#dc3545',
                  background: 'none',
                  cursor: 'pointer'
                }}>
                  Track Balance
                </button>
              </div>
            </div>

            <div style={{
              maxWidth: '1200px',
              margin: '20px auto',
              padding: '20px',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{ 
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '20px',
              }}>
                TATA CLIQ Gift Card for Corporate
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                border: '1px dashed #ccc',
                borderRadius: '8px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    marginRight: '15px',
                    border: '2px solid #ff4081',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}>
                    🎁
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                      Corporate GIFT CARDS
                    </h3>
                    <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#666' }}>
                      The perfect gifting options to reward your employees
                    </p>
                  </div>
                </div>
                <button
                  style={{
                    backgroundColor: '#ff4081',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e91e63')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff4081')}
                >
                  Explore Benefits
                </button>
              </div>
            </div>

            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              padding: '2rem'
            }}>
              <h2 style={{ 
                fontSize: '1.25rem',
                fontWeight: 700,
                marginBottom: '1.5rem'
              }}>
                Please Note
              </h2>
              <ul style={{ 
                listStyle: 'none',
                padding: 0,
                marginBottom: '1.5rem'
              }}>
                {[
                  'CLiQ Cash can\'t be cancelled or transferred to another account.',
                  'It can\'t be withdrawn in cash or transferred to any bank account. It can\'t be used to purchase Gift Cards.',
                  'Net-banking and credit/debit cards issued in India can be used for CLiQ Credit top up.',
                  'CLiQ Cash has an expiration date. Check FAQs for details.',
                ].map((item, index) => (
                  <li key={index} style={{ 
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{ marginRight: '0.5rem' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ 
                display: 'flex',
                marginBottom: '1.5rem'
              }}>
                <a href="#faq" style={{ 
                  color: '#212529',
                  textDecoration: 'none',
                  marginRight: '1rem',
                  fontWeight: 500
                }}>
                  FAQ's
                </a>
                <a href="#tac" style={{ 
                  color: '#212529',
                  textDecoration: 'none',
                  fontWeight: 500
                }}>
                  T&C's
                </a>
              </div>
              <div style={{ fontWeight: 500 }}>Owikcilver</div>
            </div>
          </div>
        </div>

        <div style={{ 
          width: '320px', 
          backgroundColor: '#fff', 
          height: 'calc(100vh - 56px)', 
          overflowY: 'auto', 
          padding: '1rem',
          borderLeft: '1px solid #dee2e6'
        }}>
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: '1.5rem',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ 
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#ff3f6c',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '0.5rem'
              }}>
                Y
              </div>
              <h5 style={{ 
                margin: 0,
                fontSize: '0.875rem',
                fontWeight: 500
              }}>
               {FName}
              </h5>
            </div>
            <p style={{ 
              color: '#6c757d',
              fontSize: '0.875rem',
              margin: 0
            }}>
          {userEmail}
            </p>
          </div>

          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            padding: '1rem'
          }}>
            <h5 style={{ 
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: '0.75rem'
            }}>
              Default Address
            </h5>
            <address style={{ 
              color: '#6c757d',
              fontSize: '0.875rem',
              lineHeight: 1.5,
              margin: 0,
              fontStyle: 'normal'
            }}>
              Home<br />
              Gandasi, handpost, arakere<br />
              (tq.)hassan (D), Gandasi hobli<br />
              hassan road, handpost<br />
              Karnataka 57319, ABSKERE<br />
              ph. 9353881553
            </address>
          </div>
        </div>
      </div>

      <Footercash />
      <Footer2 />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  giftCardSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    border: '1px dashed #ccc',
    borderRadius: '8px',
  },
  giftCardContent: {
    display: 'flex',
    alignItems: 'center',
  },
  giftCardIcon: {
    width: '40px',
    height: '40px',
    marginRight: '15px',
    border: '2px solid #ff4081',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  giftCardText: {
    h3: {
      margin: 0,
      fontSize: '16px',
      fontWeight: 'bold',
    },
    p: {
      margin: '5px 0 0',
      fontSize: '14px',
      color: '#666',
    },
  },
  exploreButton: {
    backgroundColor: '#ff4081',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  exploreButtonHover: {
    backgroundColor: '#e91e63',
  },
};

export default GiftCard;