import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { Search } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import placeholderImage from '../assets/asd_collections/m_watch.png';

const SearchModal = ({ show, handleClose }) => {
  const modalRef = useRef();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hovered, setHovered] = useState(null); // Add hovered state
  const navigate = useNavigate();
  const debounceTimeoutRef = useRef(null);

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/search?query=${query}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        fetchSearchResults(value);
      } else {
        setSearchResults([]);
      }
    }, 300);
  };

  const handleProductClick = (product) => {
    const productSlug = product.title.replace(/ /g, '-');
    navigate(`/products/product/${productSlug}?id=${product.product_id}`);
    handleClose();
  };

  return (
    <>
      {show && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(8px)', zIndex: 1040 }}></div>
      )}
      
      {/* Search Modal */}
      <div style={{ position: 'fixed', top: 0, right: show ? 0 : '-100%', height: '100vh', width: '35%', backgroundColor: '#ffffff', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', transition: 'right 0.5s ease-in-out', zIndex: 1050, overflowY: 'auto' }}>
        <div ref={modalRef} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #ddd' }}>
            <div className="d-flex align-items-center">
              <Search size={20} />
              <input type="text" placeholder="Search Products..." value={query} onChange={handleInputChange} style={{ marginLeft: '10px', border: 'none', outline: 'none', fontSize: '16px' }} />
            </div>
            <FaTimes style={{ cursor: 'pointer' }} onClick={handleClose} />
          </div>

          {/* Search Results Section */}
          <div style={{ flex: 1, padding: '20px' }}>
            <h6>Search Result</h6>
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <Row
                  key={item._id}
                  className="mb-4 align-items-center"
                  onClick={() => handleProductClick(item)}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(item._id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Col xs={3}>
                    <img src={item.image || placeholderImage} alt={item.title} style={{ width: '100%', borderRadius: '8px' }} />
                  </Col>

                  <Col xs={6}>
                    <h6
                      className="mb-1"
                      style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        textDecoration: hovered === item._id ? 'underline' : 'none',
                        transition: 'text-decoration 0.3s',
                      }}
                    >
                      {item.title}
                    </h6>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#B37E56', marginBottom: '0' }}>
                        $ {item.isOnSale ? item.salePrice.toFixed(2) : item.price.toFixed(2)}
                      </p>
                      {item.isOnSale && (
                        <p style={{ fontSize: '14px', textDecoration: 'line-through', color: '#aaa', marginBottom: '0' }}>
                          $ {item.price.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </Col>
                </Row>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
