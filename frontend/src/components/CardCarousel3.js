import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const cardData = [
  {
    
    img: 'https://assets.tatacliq.com/medias/sys_master/images/63588844404766.png',
  },
  {
    
    img: 'https://assets.tatacliq.com/medias/sys_master/images/63588844470302.png',
  },
  {
    
    img: 'https://assets.tatacliq.com/medias/sys_master/images/63588844535838.png',
  },
  {
    
    img: 'https://assets.tatacliq.com/medias/sys_master/images/63588844601374.png',
  },
  {
    
    img: 'https://assets.tatacliq.com/medias/sys_master/images/63588844666910.png',
  },
  {
    
    img: 'https://assets.tatacliq.com/medias/sys_master/images/63588844732446.png',
  },
  {
    
    img: 'https://assets.tatacliq.com/medias/sys_master/images/63588844797982.png',
  },
  
];

const CardCarousel3 = () => {
  const [startIndex, setStartIndex] = useState(0);
  const cardsToShow = 4;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, cardData.length - cardsToShow));
  };

  const visibleCards = cardData.slice(startIndex, startIndex + cardsToShow);

  return (
    <div className="position-relative px-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="light" onClick={handlePrev}><FaChevronLeft size={24} /></Button>
        <Button variant="light" onClick={handleNext}><FaChevronRight size={24} /></Button>
      </div>

      <Row className="g-3">
        {visibleCards.map((card, idx) => (
          <Col key={idx} md={3}>
            <Card
              className="text-white border-0 shadow card-hover"
              style={{
                height: '100%',
                cursor: 'pointer',
                borderRadius: '20px',
                overflow: 'hidden',
              }}
              onClick={() => alert(`Clicked: ${card.title}`)}
            >
              <Card.Img
                src={card.img}
                alt={card.title}
                style={{
                  height: '350px',
                  objectFit: 'cover',
                  borderRadius: '20px 20px 0 0',
                }}
              />
              <Card.ImgOverlay className="d-flex flex-column justify-content-end bg-gradient p-3">
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.subtitle}</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>

      <style>{`
        .card-hover {
          transition: transform 0.3s ease;
        }
        .card-hover:hover {
          transform: scale(1.03);
        }
        .bg-gradient {
          background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0));
        }
        .card-hover .card-img-overlay {
          border-radius: 0 0 20px 20px;
        }
      `}</style>


 <div>
        <h1 style={{ paddingTop: '30px', paddingBottom: '30px' }}>
          Next-Gen Fashion
        </h1>
      </div>
       </div>

    
  );
};

export default CardCarousel3;
