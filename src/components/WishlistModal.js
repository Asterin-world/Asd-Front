import React, { useEffect, useRef } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
// import { useCart } from '../hooks/CartContext';
import { FaTimes } from 'react-icons/fa';
import image1 from '../assets/asd_collections/m_watch.png'; // Placeholder image for products
import {Heart} from 'react-bootstrap-icons';
import { useWishlist } from '../hooks/WishListContext';
import { useCart } from '../hooks/CartContext';
const WishListModal = ({ show, handleClose }) => {
  const { state: wishlistState, removeFromWishlist  } = useWishlist();
  const { dispatch: cartDispatch} = useCart();
  const modalRef = useRef();
  const totalWishlistItems = wishlistState.items.length;

  // Function to add the item to the cart and remove from the wishlist
  const handleAddToBag = (item) => {
    // Prepare the item to add to the cart
    const itemToAdd = {
      product_id: item.product_id,
      title: item.title,
      description: item.description,
      isOnSale: item.isOnSale,
      salePrice: item.salePrice,
      price: item.price,
      quantity: 1, // Default quantity as 1 when adding from the wishlist
      image: item.image,
    };
    // Dispatch the ADD_ITEM action to the cart context
    cartDispatch({ type: 'ADD_ITEM', payload: itemToAdd });
    // Remove the item from the wishlist
    removeFromWishlist(item.product_id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, handleClose]);

  return (
    <>
      {/* Backdrop with blur effect */}
      {show && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)',
            zIndex: 1040,
          }}
        ></div>
      )}
      
      {/* Cart Modal */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: show ? 0 : '-100%',
          height: '100vh',
          width: '35%',
          backgroundColor: '#ffffff',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
          transition: 'right 0.5s ease-in-out',
          zIndex: 1050,
          overflowY: 'auto',
        }}
      >
        {/* Modal Content Wrapper */}
        <div ref={modalRef} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header Section */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px',
              borderBottom: '1px solid #ddd',
            }}
          >
            <div className="d-flex align-items-center">
              <Heart color="black" size={20} />
              <h5 style={{ marginLeft: '10px', marginBottom: '0' }}>Wishlist</h5>
            </div>
            <FaTimes style={{ cursor: 'pointer' }} onClick={handleClose} />
          </div>

          {/* Items Section */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <h6>{totalWishlistItems} Items Added</h6>
            {wishlistState.items.map((item, index) => (
              <Row key={index} className="mb-3 align-items-center">
                {/* Product Image */}
                <Col xs={3}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#f5f5f5', // Grey background for image
                      borderRadius: '0px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px',
                    }}
                  >
                    <img src={image1} alt={item.title} style={{width: '100px', height: '100px'}} />
                  </div>
                </Col>

                {/* Product Info */}
                <Col xs={6}>
                  <h6 className="mb-1" style={{ fontSize: '16px', fontWeight: '500' }}>{item.title}</h6>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="mb-1" style={{ fontSize: '14px', fontWeight: '600', color: '#B37E56' }}>
                      $ {item.isOnSale ? item.salePrice.toFixed(2) : item.price.toFixed(2)}
                    </span>
                    {item.isOnSale && (
                      <span
                        className="mb-1" 
                        style={{
                          fontSize: '14px',
                          textDecoration: 'line-through',
                          color: '#aaa',
                          marginLeft: '10px',
                        }}
                      >
                        $ {item.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Quantity Selector & Remove Button */}
                  <div className="mt-2" style={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                      variant="primary"
                      size="sm"
                      style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#B37E56', borderColor: '#B37E56'}}
                      onClick={() => handleAddToBag(item)}
                    >
                      Add to Bag
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      style={{ marginLeft: '10px', padding: '5px 10px', color: '#B37E56', borderColor: '#B37E56'}}
                      onClick={() => removeFromWishlist(item.product_id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Col>
              </Row>
            ))}
          </div>
          {/* Sticky Summary Section */}
        </div>
      </div>
    </>
  );
};

export default WishListModal;
