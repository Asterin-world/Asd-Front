import React, { useEffect, useRef } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { useCart } from '../hooks/CartContext';
import image1 from '../assets/asd_collections/m_watch.png'; // Placeholder image for products
import { Bag } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const CartModal = ({ show, handleClose }) => {
  const { state, dispatch, handleRemoveItem } = useCart();
  const modalRef = useRef();
  const navigate = useNavigate();

  // Calculate total price and total savings
  const totalPrice = state.items.reduce((total, item) => total + (item.price) * item.quantity, 0);
  const totalSavings = state.items.reduce(
    (total, item) => total + (item.isOnSale ? (item.price - item.salePrice) * item.quantity : 0),
    0
  );
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

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

  const handleCheckout = () => {
    handleClose(); // Close the modal
    navigate('/checkout'); // Redirect to checkout page
  };

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
              <Bag size={20} />
              <h5 style={{ marginLeft: '10px', marginBottom: '0' }}>Bag</h5>
            </div>
            <FaTimes style={{ cursor: 'pointer' }} onClick={handleClose} />
          </div>

          {/* Items Section */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <h6>{totalItems} Items Added</h6>
            {state.items.length > 0 ?
            state.items.map((item, index) => {
              const optionParams = Object.keys(item.options || {}).map(
                (key) => `${key}=${encodeURIComponent(item.options[key])}`
              ).join('&');
              const productLink = `/products/${item.category}/${item.subcategory}/product/${item.product_id}?${optionParams}`;

             return (
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
                      $ {item.isOnSale ? item.salePrice : item.price}
                    </span>
                    {item.isOnSale && (
                      <span className="mb-1"
                        style={{
                          fontSize: '14px',
                          textDecoration: 'line-through',
                          color: '#aaa',
                          marginLeft: '10px',
                        }}
                      >
                        $ {item.price}
                      </span>
                    )}
                  </div>

                  {/* Quantity Selector & Remove Button */}
                  <div className="mt-2" style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      variant="outline-secondary"
                      style={{ borderRadius: '0px', padding: '5px 10px' }}
                      onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: { product_id: item.product_id, options: item.options } })}
                    >
                      -
                    </Button>
                    <span style={{ padding: '0 10px' }}>{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      style={{ borderRadius: '0px', padding: '5px 10px' }}
                      onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: { product_id: item.product_id, options: item.options } })}
                    >
                      +
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      style={{
                        marginLeft: '10px',
                        borderRadius: '0px',
                        color: '#B37E56',
                        borderColor: '#B37E56',
                        padding: '5px 10px'
                      }}
                      onClick={() => handleRemoveItem(item.product_id, item.options)}
                    >
                      Remove
                    </Button>
                    {/* <Button
                      variant="outline-danger"
                      size="sm"
                      style={{ marginLeft: '10px', padding: '5px 10px' }}
                      onClick={() => handleRemoveItem(item.product_id)}
                    >
                      <FaTrash />
                    </Button> */}
                  </div>
                </Col>
                
              </Row>
            )}) : "There are no items in your bag."}
          </div>

          {/* Sticky Summary Section */}
          <div
            style={{
              padding: '20px',
              borderTop: '1px solid #ddd',
              position: 'sticky',
              bottom: 0,
              backgroundColor: '#ffffff',
              boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ marginBottom: '10px' }}>
              <Row style={{ marginBottom: '10px' }}>
                <Col>Subtotal:</Col>
                <Col style={{ textAlign: 'right' }}>$ {totalPrice.toFixed(2)}</Col>
              </Row>
              <Row style={{ marginBottom: '10px' }}>
                <Col>You Saved:</Col>
                <Col style={{ textAlign: 'right', color: '#118C4F' }}>- $ {totalSavings.toFixed(2)}</Col>
              </Row>
              <Row style={{ marginBottom: '10px' }}>
                <Col>Shipping:</Col>
                <Col style={{ textAlign: 'right', color: '#B37E56' }}>FREE</Col>
              </Row>
              <hr />
              <Row style={{ fontWeight: 'bold', fontSize: '18px' }}>
                <Col>Total:</Col>
                <Col style={{ textAlign: 'right' }}>$ {(totalPrice - totalSavings).toFixed(2)}</Col>
              </Row>
            </div>

            {/* Checkout & Continue Shopping Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button variant="primary" onClick={handleClose} style={{ flex: 1, borderRadius: '0px', marginRight: '5px', backgroundColor: '#B37E56', borderColor: '#B37E56' }}>
                Continue Shopping
              </Button>
              <Button disabled={state.items.length > 0 ? false : true} onClick={handleCheckout} variant="primary" style={{ flex: 1, borderRadius: '0px', backgroundColor: '#B37E56', borderColor: '#B37E56' }}>
                Check Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
