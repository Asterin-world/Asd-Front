// src/components/Banner.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = ({ category, subcategory }) => {
  // Define dynamic banners based on category and subcategory
  const banners = {
    mens: {
      watches: {
        image: require('../../assets/banners/banner_watches.png'), // Replace with your actual path or image
        title: 'Watches',
        description:
          'Luxury should be for everyone. We offer custom diamond watches to fit your style and budget, making it easy to own a piece that’s truly yours.',
      },
      chains: {
        image: '/path-to-your-image-for-mens-chains.jpg',
        title: 'Chains',
        description: 'Discover our premium chains, perfect for adding a touch of sophistication.',
      },
    },
    womens: {
      watches: {
        image: '/path-to-your-image-for-womens-watches.jpg',
        title: 'Watches',
        description:
          'Our selection of women\'s watches combines beauty and functionality for everyday elegance.',
      },
      necklace: {
        image: '/path-to-your-image-for-womens-necklace.jpg',
        title: 'Necklaces',
        description: 'Explore our collection of exquisite necklaces, crafted for elegance and grace.',
      },
    },
  };

  // Get the banner data based on category and subcategory
  const bannerData = banners[category]?.[subcategory] || {
    image: '/default-banner-image.jpg',
    title: 'Our Products',
    description: 'Explore our collection of luxurious products crafted for excellence.',
  };

  return (

    // MAKE NECESSARY CHANGES LATER FOR PROP OPTIMIZATION
    <div className="banner-container">
      <div className="banner-content">
        {/* Breadcrumb */}
        <p className="banner-breadcrumb">
          <Link to="/" className="breadcrumb-link">HOME</Link> &gt;
          <span className="breadcrumb-category"> {category.toUpperCase()}</span>
          <span className="breadcrumb-subcategory"> {subcategory.toUpperCase()}</span>
        </p>

        {/* Title and Description */}
        {banners[category] && <><h2 className="banner-heading">{bannerData.title}</h2>
        <p className="banner-description">{bannerData.description}</p></>  }
      </div>

      {/* Image on the right side */}
      <div className="banner-image">
        <img src={bannerData.image} alt={bannerData.title} className="img-fluid" />
      </div>
    </div>
  );
};

export default Banner;
