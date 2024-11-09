import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Button, Card, Spinner, Collapse } from 'react-bootstrap';
import { fetchProductById } from '../services/productService';
import { BsShare, BsLock, BsEmojiSmile } from 'react-icons/bs'; // Icons from react-icons
import { Heart, HeartFill} from 'react-bootstrap-icons'
import image1 from '../assets/asd_collections/m_watch.png';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SanitizedHTMLContent from '../components/SanitizedHTMLContent';
import PopularChoice from '../components/PopularChoice';
import { ProductProvider } from '../hooks/ProductContext';
import ProductImageGallery from '../components/ProductImageGallery';
import { useCart } from '../hooks/CartContext'; // Import the custom hook
import image2 from '../assets/asd_collections/m_braces.png';
import CartModal from '../components/CartModal';
import { useWishlist } from '../hooks/WishListContext';

const ProductDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const product_id = queryParams.get('id'); // Extracts `id` from the URL query parameters

  // Extract category and subcategory from the URL path
  const pathSegments = location.pathname.split('/');
  const category = pathSegments[2];
  const subcategory = pathSegments.length > 3 ? pathSegments[3] : '';
  const demoImages = [image1, image2];

  const { dispatch: cartDispatch } = useCart();
  const {state: wishlistState, dispatch: wishlistDispatch} = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openDescription, setOpenDescription] = useState(true);
  const [openShippingInfo, setOpenShippingInfo] = useState(true);
  const [openProductDetails, setOpenProductDetails] = useState(true);
  const relatedSectionRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState({}); 
  const [displayedPrice, setDisplayedPrice] = useState(null);
  const [saleDisplayPrice, setSaleDisplayPrice] = useState(null);
  const [isOnSale, setIsOnSale] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const toggleCart = () => setShowCart((prev) => !prev);

  // Fetch product by ID
  useEffect(() => {
    if (product_id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const productData = await fetchProductById(category, subcategory, product_id);
          setProduct(productData);

          // Set default selected options based on the first value in each option
          if (productData.options) {
            const defaultOptions = {};
            productData.options.forEach((option) => {
              defaultOptions[option.name] = option.values[0]; // Select the first option by default
            });
            setSelectedOptions(defaultOptions);
          }
        } catch (error) {
          console.error('Failed to fetch product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [product_id, category, subcategory]);

  const isInWishlist = wishlistState.items.some((item) => item.product_id === product_id);
  useEffect(() => {
    if (product && product.options) { // Ensure product and options are defined
      const defaultOptions = {};
      product.options.forEach((option) => {
        defaultOptions[option.name] = option.values[0]; // Select the first value by default
      });
      setSelectedOptions(defaultOptions);
    }
  }, [product]);

  // Update displayed price based on selected options
  useEffect(() => {
    if (product && product.variants && product.options) { // Ensure product, variants, and options are defined
      const matchingVariant = product.variants.find((variant) => {
        return product.options.every((option, index) => {
          const optionName = option.name;
          const selectedValue = selectedOptions[optionName];
          const variantOptionValue = variant[`option${index + 1}`]; // option1, option2, etc.

          return variantOptionValue === selectedValue;
        });
      });

      if (matchingVariant) {
        setDisplayedPrice(matchingVariant.price);
        setSaleDisplayPrice(matchingVariant.isOnSale  ? matchingVariant.salePrice : null);
        setIsOnSale(matchingVariant.isOnSale);
      } else {
        setDisplayedPrice(product.price);
        setIsOnSale(product.isOnSale);
        setSaleDisplayPrice(product.isOnSale  ? product.salePrice : null);
      }
    }else {
      setDisplayedPrice(product?.price);
      setIsOnSale(product?.isOnSale);
      setSaleDisplayPrice(product?.isOnSale  ? product?.salePrice : null);
    }
  }, [selectedOptions, product]);

  const handleOptionChange = (optionName, optionValue) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: optionValue
    }));
    console.log(selectedOptions);
  };
const handleAddToCart = () => {
  if (product) {
    console.log(product)
    const variantTitle = product && product.options && product.variants ?`${product.title} - ${Object.values(selectedOptions).join(" / ")}` : product.title;
    console.log(variantTitle, "variantTitlevariantTitlevariantTitlevariantTitle")
    const itemToAdd = {
      product_id: product.product_id,
      title: variantTitle,
      description: product.description,
      isOnSale: isOnSale,
      salePrice: saleDisplayPrice,
      price: displayedPrice,
      quantity: product.quantity || 1,
      image: product.images && product.images.length > 0 ? product.images[0] : '',
      options: selectedOptions, // Pass selected options
    };

    cartDispatch({ type: 'ADD_ITEM', payload: itemToAdd });
    toggleCart();
  }
};

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: { product_id: product.product_id } });
    } else {
      const variantTitle = product && product.options && product.variants ?`${product.title} - ${Object.values(selectedOptions).join(" / ")}` : product.title;
      wishlistDispatch({
        type: 'ADD_TO_WISHLIST',
        payload: {
          product_id: product.product_id,
          title: variantTitle,
          description: product.description,
          isOnSale: isOnSale,
          salePrice: saleDisplayPrice,
          price: displayedPrice,
          quantity: product.quantity || 1,
          image: product.images && product.images.length > 0 ? product.images[0] : '',
          options: selectedOptions,
        },
      });
    }
  };

  return (
    <>
      <div className="product-details-page my-5" style={{ padding: "10px 100px 0px 100px" }}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          product && (
            <>
              <CartModal show={showCart} handleClose={toggleCart} />
              {/* Product Information Section */}
              <Row className="mb-4">
                {/* Left Column - Product Image Gallery */}
                <Col md={6}>
                  <ProductImageGallery demoImages={demoImages} relatedSectionRef={relatedSectionRef} />
                </Col>

                {/* Right Column - Product Details */}
                <Col md={6}>
                  {/* New Arrival Tag and Icons */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge" style={{ backgroundColor: '#B37E56', opacity: '85%', fontStyle: 'normal' }}>New Arrival</span>
                    <div className="d-flex">
                      {/* Heart Icon with Round Background */}
                      <div
                        className="d-flex justify-content-center align-items-center rounded-circle me-3"
                        onClick={() => handleWishlistToggle()}
                        style={{
                          width: '35px',
                          height: '35px',
                          backgroundColor: '#F8F9FA',
                          border: '1px solid #F8F9FA',
                          cursor: 'pointer',
                        }}
                      >
                        {isInWishlist ? (
                          <HeartFill color="red" size={18} />
                        ) : (
                          <Heart color="black" size={18} />
                        )}
                        {/* <Heart size={18} style={{ color: 'black' }} /> */}
                      </div>

                      {/* Share Icon with Round Background */}
                      <div
                        className="d-flex justify-content-center align-items-center rounded-circle"
                        style={{
                          width: '35px',
                          height: '35px',
                          backgroundColor: '#F8F9FA',
                          border: '1px solid #F8F9FA',
                          cursor: 'pointer',
                        }}
                      >
                        <BsShare size={18} style={{ color: 'black' }} />
                      </div>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h2 className="fw-bold text-dark">{product.title}</h2>

                  {/* Product Price and Taxes in Same Line */}
                  <div className="d-flex align-items-center mb-2">
                    <p className="mb-0 me-3" style={{ fontSize: '1.25rem' }}>
                      {isOnSale && (
                        <>
                          <span className="fw-bold" style={{ color: '#B37E56' }}>$ {saleDisplayPrice || product.salePrice}</span>
                          <span className="text-muted text-decoration-line-through ms-2">$ {displayedPrice || product.price}</span>
                        </>
                      )}
                      {!isOnSale && (
                        <span className="fw-bold" style={{ color: '#B37E56' }}>$ {displayedPrice || product.price}</span>
                      )}
                    </p>
                    <p className="text-muted mb-0">Incl. of all taxes</p>
                  </div>
                  <hr />

                  {/* product options */}
                  {product.options?.map((option) => (
                    <div key={option.name} className="mb-3">
                      <div className="fw-regular d-flex align-items-center mb-2">{option.name}:</div>
                      <div className="d-flex">
                        {option.values.map((value) => (
                          <Button
                            key={value}
                            variant="secondary"
                            style={{ color: "black", backgroundColor: "#f8f8f8", borderColor: selectedOptions[option.name] === value ? 'black' : '#f8f8f8',marginRight: '10px', borderRadius: '0' }}
                            onClick={() => handleOptionChange(option.name, value)}
                          >
                            {value}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Quantity Section */}
                  <div className="fw-regular d-flex align-items-center mb-2">
                    Quantity
                  </div>

                  {/* Quantity Selector */}
                  <div className="d-flex align-items-center mb-3">
                    <Button style={{ borderRadius: 0, borderColor: "#f8f8f8", backgroundColor: "#f8f8f8", color: "black" }} variant="secondary" onClick={() => setProduct((prev) => ({ ...prev, quantity: Math.max(1, (prev.quantity || 1) - 1) }))}>
                      -
                    </Button>
                    <input
                      style={{ borderRadius: 0, borderColor: "#f8f8f8", backgroundColor: "#f8f8f8" }}
                      type="number"
                      className="form-control w-25 mx-2 text-center"
                      value={product.quantity || 1}
                      min="1"
                      readOnly
                    />
                    <Button style={{ borderRadius: 0 , borderColor: "#f8f8f8", backgroundColor: "#f8f8f8", color: "black"}} variant="secondary" onClick={() => setProduct((prev) => ({ ...prev, quantity: (prev.quantity || 1) + 1 }))}>
                      +
                    </Button>
                  </div>

                  {/* Buttons */}
                  <div className="mb-4 d-flex">
                    <Button
                      variant="outline-secondary"
                      style={{ color: '#B37E56', borderRadius: 0, borderColor: '#B37E56' }}
                      className="me-3 w-100 w-md-50"
                      onClick={handleAddToCart} >
                      Add to Bag
                    </Button>
                    <Button variant="primary" style={{ borderRadius: 0, backgroundColor: '#B37E56', borderColor: '#B37E56' }} className="w-100 w-md-50">Buy Now</Button>
                  </div>
                  <hr />

                  {/* Product Highlights */}
                  <p className="d-flex align-items-center">
                    <BsLock className="me-2" />
                    Flexible and secure payment, pay on delivery
                  </p>
                  <p className="d-flex align-items-center">
                    <BsEmojiSmile className="me-2" /> 60,000 happy customers
                  </p>
                  <hr />

                  {/* Collapsible Sections for Product Details */}
                  <div>
                    {/* Description Section */}
                    <div>
                      <Button
                        onClick={() => setOpenDescription(!openDescription)}
                        aria-controls="description-collapse"
                        aria-expanded={openDescription}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '10px 0',
                          fontWeight: '600',
                          fontSize: '16px',
                          width: '100%',
                          textAlign: 'left',
                          color: '#333',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        Description
                        {openDescription ? <FaChevronUp /> : <FaChevronDown />}
                      </Button>
                      <Collapse in={openDescription}>
                        <Card.Body
                          id="description-collapse"
                          style={{
                            fontSize: '14px',
                            lineHeight: '1.5',
                            color: '#555',
                            border: 'none',
                            padding: '10px 0',
                          }}
                        >
                          <SanitizedHTMLContent style={{ fontSize: '14px', lineHeight: '1.6', color: '#555' }} htmlContent={product.description} />
                        </Card.Body>
                      </Collapse>
                    </div>
                    <hr />
                    {/* Product Details Section */}
                    <div>
                      <Button
                        onClick={() => setOpenProductDetails(!openProductDetails)}
                        aria-controls="guarantee-collapse"
                        aria-expanded={openProductDetails}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '10px 0',
                          fontWeight: '600',
                          fontSize: '16px',
                          width: '100%',
                          textAlign: 'left',
                          color: '#333',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        Product Details
                        {openProductDetails ? <FaChevronUp /> : <FaChevronDown />}
                      </Button>
                      <Collapse in={openProductDetails}>
                        <Card.Body
                          id="guarantee-collapse"
                          style={{
                            fontSize: '14px',
                            lineHeight: '1.5',
                            color: '#555',
                            border: 'none',
                            padding: '10px 0',
                          }}
                        >

                          <SanitizedHTMLContent style={{ fontSize: '14px', lineHeight: '1.6', color: '#555', paddingLeft: '0px'}} htmlContent={product.productDetails} />
                        </Card.Body>
                      </Collapse>
                    </div>
                    <hr />

                    {/* Shipping Info Section */}
                    <div>
                      <Button
                        onClick={() => setOpenShippingInfo(!openShippingInfo)}
                        aria-controls="shipping-info-collapse"
                        aria-expanded={openShippingInfo}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '10px 0',
                          fontWeight: '600',
                          fontSize: '16px',
                          width: '100%',
                          textAlign: 'left',
                          color: '#333',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        Shipping Info
                        {openShippingInfo ? <FaChevronUp /> : <FaChevronDown />}
                      </Button>
                      <Collapse in={openShippingInfo}>
                        <Card.Body
                          id="shipping-info-collapse"
                          style={{
                            fontSize: '14px',
                            lineHeight: '1.5',
                            color: '#555',
                            border: 'none',
                            padding: '10px 0',
                          }}
                        >
                          <ul style={{ paddingLeft: '0px' }}>
                            <li style={{ marginBottom: '8px' }}>- No EU import duties.</li>
                            <li style={{ marginBottom: '8px' }}>- Shipping update will get instantly.</li>
                            <li style={{ marginBottom: '8px' }}>
                              - The product is packed in our fully recyclable and biodegradable signature boxes.
                            </li>
                          </ul>
                        </Card.Body>
                      </Collapse>
                    </div>
                    <hr />
                    <div style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      padding: '10px 0',
                      fontWeight: '600',
                      fontSize: '16px',
                      width: '100%',
                      textAlign: 'left',
                      color: '#333',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      Guarantee Safe Checkout
                    </div>
                    <div className="d-flex justify-content-start align-items-center" >
                      {/* <div className="d-flex"> */}
                      <img src={`${process.env.PUBLIC_URL}/assets/payment-options/amex.png`} alt="AMEX" className="me-2" style={{ width: "70px", height: "35px" }} />
                      <img src={`${process.env.PUBLIC_URL}/assets/payment-options/apple.png`} alt="APPLE PAY" className="me-2" style={{ width: "70px", height: "35px" }} />
                      <img src={`${process.env.PUBLIC_URL}/assets/payment-options/gpay.png`} alt="G Pay" className="me-2" style={{ width: "70px", height: "35px" }} />
                      <img src={`${process.env.PUBLIC_URL}/assets/payment-options/master.png`} alt="MASTER CARD" className="me-2" style={{ width: "70px", height: "35px" }} />
                      <img src={`${process.env.PUBLIC_URL}/assets/payment-options/shop.png`} alt="SHOP" className="me-2" style={{ width: "70px", height: "35px" }} />
                      <img src={`${process.env.PUBLIC_URL}/assets/payment-options/union.png`} alt="UNION PAY" className="me-2" style={{ width: "70px", height: "35px" }} />
                      <img src={`${process.env.PUBLIC_URL}/assets/payment-options/visa.png`} alt="VISA" className="me-2" style={{ width: "70px", height: "35px" }} />
                      {/* </div> */}
                    </div>

                  </div>
                </Col>
              </Row>

              {/* Related Products Section */}
              <Row className="mb-5" ref={relatedSectionRef}>
                <Col>
                  <ProductProvider>
                    <PopularChoice title="YOU MAY ALSO LIKE" currentProductId={product.product_id} />
                  </ProductProvider>
                </Col>
              </Row>
            </>
          )
        )}
      </div>
    </>
  );
};

export default ProductDetails;
