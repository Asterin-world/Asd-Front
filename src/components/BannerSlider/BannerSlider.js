import React from 'react';
import video1 from "./../../assets/banners/banner-slider-1.mp4";
import video2 from "./../../assets/banners/banner-slider-2.mp4";
import video3 from "./../../assets/banners/banner-slider-3.mp4";
import video4 from "./../../assets/banners/banner-slider-4.mp4";
import './BannerSlider.css';  // Custom CSS for layout

const bannerSliderData = [
  {
    "id": 1,
    "videoSrc": video1,
    "title": "Top Trends in Solitaire Ring",
    "heading": "A Classic Elegance Gift",
    "description": "A classic diamond gift embodies timeless elegance, making every occasion special and unforgettable for recipients."
  },
  {
    "id": 2,
    "videoSrc": video2,
    "title": "NEW ARRIVALS",
    "heading": "Hand Crafted Diamond Jewels For Lasting Memory",
    "description": "Extraordinary masterpieces that immortalize your most unforgettable moments with breathtaking elegance and brilliance."
  },
  {
    "id": 3,
    "videoSrc": video3,
    "title": "Dazzling Design",
    "heading": "Unveil The Beauty Of Our Diamond Creation",
    "description": "Discover the beauty of our diamond creations, each piece radiating unique brilliance and timeless elegance."
  },
  {
    "id": 4,
    "videoSrc": video4,
    "title": "Personalized",
    "heading": "Timeless Diamond Jewellery Crafted To Reflection",
    "description": "The jewellery that personalized to reflect your unique style and beauty for every occasion."
  }
];

const BannerSlider = () => {

  const carouselData = bannerSliderData;

  return (
    <>
      <div id="carouselVideoExample" className="carousel slide carousel-fade carousel-dark" data-bs-interval="5000"  data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators">
          {carouselData.map((item, index) => (
            <button
              key={item.id}
              type="button"
              data-bs-target="#carouselVideoExample"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
              style={{backgroundColor: '#f9f3ee'}}
            ></button>
          ))}
        </div>

        {/* Carousel Inner */}
        <div className="carousel-inner">
          {carouselData.map((item, index) => (
            <div key={item.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="align-items-center banner-slide">
                {/* Text on the left */}
                <div className="col-md-6 banner-text">
                  <h6 className="banner-title text-uppercase">{item.title}</h6>
                  <p className="banner-heading">{item.heading}</p>
                  <p className="banner-description">{item.description}</p>
                </div>

                {/* Video on the right */}
                <div className="col-md-6 banner-video">
                  <video className="img-fluid" autoPlay loop muted>
                    <source src={item.videoSrc} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button 
          className="carousel-control-prev" 
          type="button" 
          data-bs-target="#carouselVideoExample" 
          data-bs-slide="prev"
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "#f9f3ee",
            borderRadius: "50%",
            top: "45%",
            left: '50px',
            // transform: "translateY(-50%)",
          }}
          >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button 
          className="carousel-control-next" 
          type="button" 
          data-bs-target="#carouselVideoExample" 
          data-bs-slide="next"
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "#f9f3ee",
            borderRadius: "50%",
            top: "45%",
            right: '50px',
            // transform: "translateY(-50%)",
          }}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        {/* Bottom Banner */}
      </div>
      <div className="bottom-banner fw-bold text-wrap text-center text-black text-md">
        <div className="marquee">
          <span>
            100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion
          </span>
          <span>
            100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion • 100% Authentic Diamond • Trendy fashion
          </span>
        </div>
      </div>
    </>
  );
};

export default BannerSlider;