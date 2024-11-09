import React, { useState,  useEffect, useRef  } from 'react';
import { Row, Col } from 'react-bootstrap';

const ProductImageGallery = ({ demoImages, relatedSectionRef }) => {
  // State to track the selected image for the main display
  const [selectedImage, setSelectedImage] = useState(demoImages[0]); // Default to the first image in the array
  const [isSticky, setIsSticky] = useState(false);
  const [shouldScrollUp, setShouldScrollUp] = useState(false);
  const galleryRef = useRef(null);

  // Sticky effect handler
  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const offsetTop = galleryRef.current.getBoundingClientRect().top;
        setIsSticky(offsetTop <= 100 && !shouldScrollUp); // Adjust top value as needed
      }
    };

    // IntersectionObserver to detect when the related products section is in view
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15, // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShouldScrollUp(true);
          setIsSticky(false); // Disable sticky when the section is in view
        } else {
          setShouldScrollUp(false);
          setIsSticky(true); // Enable sticky when the section is not in view
        }
      });
    }, observerOptions);

    if (relatedSectionRef.current) {
      observer.observe(relatedSectionRef.current);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (relatedSectionRef.current) {
        observer.unobserve(relatedSectionRef.current);
      }
    };
  }, [relatedSectionRef, shouldScrollUp]);

  return (
    <Row className={`thumbnail-container ${isSticky ? 'is-sticky' : ''}`} style={{position: isSticky ? 'fixed' : 'relative', marginBottom: '1.5rem', display: 'flex', flexDirection: 'row'}}>
      {/* Left Column - Product Thumbnails */}
      <Col
        md={2}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '500px',
            overflowY: 'auto',
            marginBottom: '1rem',
            paddingRight: '0.5rem',
          }}
        >
          {demoImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)} // Set the selected image on click
              style={{
                border: image === selectedImage ? '2px solid #B37E56' : '1px solid #ddd',
                padding: '4px',
                marginBottom: '8px',
                borderRadius: '0px',
                cursor: 'pointer',
                backgroundColor: image === selectedImage ? '#f0f0f0' : 'transparent', // Change background color on selection
                width: '150px', // Set thumbnail width
                height: '150px', // Set thumbnail height
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain', // Ensure image fits well inside the thumbnail
                  borderRadius: '0px',
                }}
              />
            </div>
          ))}
        </div>
      </Col>

      {/* Right Column - Main Image Display */}
      <Col
        md={10}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '0px',
            padding: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxHeight: '710px', // Main image container max height
            maxWidth: '655px', // Main image container max width
            minHeight: '710px', // Fixed height for main image container
            minWidth: '655px', // Fixed width for main image container
            backgroundColor: '#ffffff',
          }}
        >
          <img
            src={selectedImage}
            alt="Selected Product"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              objectFit: 'contain',
            }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default ProductImageGallery;
