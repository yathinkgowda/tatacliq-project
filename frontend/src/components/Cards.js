import React from 'react';

function Cards({onBrandSelect,onCategorySelect}) {
const imageObjects = [
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63600370974750.png', name: 'WESTSIDE' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63600371040286.png', name: 'Casual Wear' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63600371105822.png', name: 'Mens' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63600371171358.png', name: 'Image 4' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63600371236894.png', name: 'Image 5' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63600371302430.png', name: 'Footwear' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63600371367966.png', name: 'Image 7' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63600371433502.png', name: 'Gold Jewellers' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63600371499038.png', name: 'Image 9' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63600371564574.png', name: 'Image 10' },
  { img: 'https://assets.tatacliq.com/medias/sys_master/images/63600371630110.png', name: 'puma' },
];


  const handleCardClick = (imageUrl, index) => {
    console.log(imageUrl,"imageUrlimageUrlimageUrl");
    // Example: navigate, open modal, or set selected image state
    // navigate(`/details/${index}`);
    if(imageUrl==="WESTSIDE"||imageUrl==="puma"){
        onBrandSelect(imageUrl);

    }else{
       onCategorySelect(imageUrl)
    }

  };

 

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', padding: '1rem' }}>
        {imageObjects.map((imageUrl, index) => (
          <div
            key={index}
            className="hover-card"
            onClick={() => handleCardClick(imageUrl.name, index)}
            style={{
              width: '180px',
              height: '120px',
              marginRight: '1rem',
              overflow: 'hidden',
              border: 'none',
              borderRadius: '8px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <img
              src={imageUrl?.img}
              alt={`Card ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        <div>
          <img
            src="https://assets.tatacliq.com/medias/sys_master/images/64684496584734.jpg"
            alt="Image 1"
            style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
          />
        </div>
        <div>
          <img
            src="https://assets.tatacliq.com/medias/sys_master/images/62309792808990.jpg"
            alt="Image 2"
            style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
          />
        </div>
      </div>

      <div style={{ paddingTop: '30px', paddingBottom: '30px', textAlign: 'center' }}>
        <h1>Best Brands on Offer</h1>
      </div>

      <style>{`
        .hover-card:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

export default Cards;
