// src/components/Sorting.js
import React from 'react';
import './Sorting.css'; // Import the CSS for sorting

const Sorting = ({ sortCriteria, handleSort }) => {
  return (
    <div className="sorting-container">
      <label htmlFor="sortOptions" className="me-2 sorting-label">Sort by:</label>
      <select
        id="sortOptions"
        value={sortCriteria}
        onChange={(e) => handleSort(e.target.value)}
        className="form-select sorting-select"
      >
        <option value="featured">Featured</option>
        <option value="best-selling">Best Selling</option>
        <option value="alphabetical-asc">Alphabetically: A-Z</option>
        <option value="alphabetical-desc">Alphabetically: Z-A</option>
        <option value="price-low-to-high">Price: Low to High</option>
        <option value="price-high-to-low">Price: High to Low</option>
        <option value="date-old-to-new">Date: Old to New</option>
        <option value="date-new-to-old">Date: New to Old</option>
      </select>
    </div>
  );
};

export default Sorting;
