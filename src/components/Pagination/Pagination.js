// src/components/Pagination.js
import React from 'react';
import './Pagination.css'; // Import the CSS for pagination

const Pagination = ({ totalPages, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container d-flex justify-content-between">
      <ul className="pagination justify-content-center">
        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; Previous
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
