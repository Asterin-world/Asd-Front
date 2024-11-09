// src/components/Loader/Loader.js
import React from 'react';
import './Loader.css'; // Add styles for your loader here

const Loader = () => (
  <div className="loader">
    <div className="spinner">
      {/* Loader spinner can be an SVG or a CSS-based spinner */}
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </div>
);

export default Loader;
