import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const cardData = [
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63588845846558.png' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63588845912094.png' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63588845977630.png' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63588846043166.png' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63588846043166.png' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63588846174238.png' },
];

const CardCarousel6 = () => {
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
                  height: '400px', // Increased from 350px to 400px
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
        {/* <h1 style={{ paddingTop: '30px', paddingBottom: '30px' }}>
          The Digi Den
        </h1> */}
      </div>
    </div>
  );
};

export default CardCarousel6;
