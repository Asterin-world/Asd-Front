import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaPinterest, FaInstagram, FaYoutube, FaChevronDown } from 'react-icons/fa';
import Logo from './../assets/ASD-logo.png';
import { useCart } from '../hooks/CartContext';
import { useWishlist } from '../hooks/WishListContext';
import CartModal from './CartModal';
import {Person, Heart, Bag, Search} from 'react-bootstrap-icons';
import WishListModal from './WishlistModal';
import SearchModal from './SearchModal';

const Header = () => {
  // const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state: cartState } = useCart(); // Access cart state
  const { state: wishlistState } = useWishlist();
  const [showCart, setShowCart] = useState(false);
  const [showWishList, setShowWishList] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const toggleCart = () => setShowCart((prev) => !prev);
  const toggleWishList = () => setShowWishList((prev) => !prev);
  const toggleSearch = () => setShowSearch((prev) => !prev);

  const totalItems = cartState.items.reduce((total, item) => total + item.quantity, 0);
  const totalWishlistItems = wishlistState.items.length;
  // const toggleMobileMenu = () => {
  //   setMobileMenuOpen(!isMobileMenuOpen);
  // };

  return (
    <>
      {/* Top Bar */}
      <style>
        {`
          /* Inline style to hide the dropdown arrow */
          .dropdown-toggle::after {
            display: none !important;
          }
        `}
      </style>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 999, backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="bg-black text-white text-sm">
          <div className="container mx-auto d-flex justify-content-between align-items-center py-2 px-4">
            <p className="m-0">AprilShine Jewellery is a fine jewellery brand that focuses on high-quality every day jewellery that does not hurt your skin.</p>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <FaPhoneAlt />
                <a href="tel:+85296845389" className="text-light text-decoration-none">+852 9684 5389</a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaEnvelope />
                <a href="mailto:aprilshine@gmail.com" className="text-light text-decoration-none">aprilshine@gmail.com</a>
              </div>
              <div className="d-flex gap-0.7">
                <a href="https://facebook.com" target="_blank" className="me-3 text-light" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://in.pinterest.com/aprilshined/" target="_blank" className="me-3 text-light" aria-label="Pinterest">
                  <FaPinterest />
                </a>
                <a href="https://www.instagram.com/aprilshine_diamond/" target="_blank" className="me-3 text-light" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://youtube.com" target="_blank" className="me-3 text-light" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-white shadow-md">
          <div className="container mx-auto d-flex align-items-center py-4 px-4 position-relative">
            {/* Left Section */}
            <div className="d-none d-md-flex justify-content-start align-items-center" style={{ flexBasis: '33.33%' }}>
              <nav className="d-flex gap-4">
                {/* Men's Dropdown */}
                <div className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle d-flex align-items-center mb-0 h1" href="#" id="menDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Men's <FaChevronDown className="ms-1" />
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="menDropdown">
                    <li><Link className="dropdown-item" to="/products/mens/chains">Chains</Link></li>
                    <li><Link className="dropdown-item" to="/products/mens/bracelet">Bracelet</Link></li>
                    <li><Link className="dropdown-item" to="/products/mens/ring">Ring</Link></li>
                    <li><Link className="dropdown-item" to="/products/mens/pendant">Pendant</Link></li>
                    <li><Link className="dropdown-item" to="/products/mens/earrings">Earrings</Link></li>
                    <li><Link className="dropdown-item" to="/products/mens/watches">Watches</Link></li>
                    <li><Link className="dropdown-item" to="/products/mens/glasses">Glasses</Link></li>
                    <li><Link className="dropdown-item" to="/products/mens/braces">Braces</Link></li>
                  </ul>
                </div>

                {/* Women's Dropdown */}
                <div className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="womenDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Women's <FaChevronDown className="ms-1" />
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="womenDropdown">
                    <li><Link className="dropdown-item" to="/products/womens/necklace">Necklace</Link></li>
                    <li><Link className="dropdown-item" to="/products/womens/bracelet">Bracelet</Link></li>
                    <li><Link className="dropdown-item" to="/products/womens/pendant">Pendant</Link></li>
                    <li><Link className="dropdown-item" to="/products/womens/ring">Ring</Link></li>
                    <li><Link className="dropdown-item" to="/products/womens/earrings">Earrings</Link></li>
                    <li><Link className="dropdown-item" to="/products/womens/watches">Watches</Link></li>
                    <li><Link className="dropdown-item" to="/products/womens/glasses">Glasses</Link></li>
                  </ul>
                </div>

                <a className="nav-link" href="#">Personalized</a>
                <Link className="text-dark text-decoration-none" to="/blogs">Blogs</Link>
                <div className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="moreDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    More at ASD <FaChevronDown className="ms-1" />
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="moreDropdown">
                    <li><Link className="dropdown-item" to="/more-at-asd/about">About ASD</Link></li>
                    <li><Link className="dropdown-item" to="/more-at-asd/asd-care">ASD Care</Link></li>
                    <li><Link className="dropdown-item" to="/more-at-asd/supportfaq">Support & FAQ</Link></li>
                  </ul>
                </div>
              </nav>
            </div>

            {/* Center: Logo */}
            <div className="d-flex justify-content-center align-items-center" style={{ flexBasis: '33.33%' }}>
              <Link to="/">
                <img src={Logo} alt="AprilShine Logo" className="w-100" style={{ maxWidth: '100px' }} />
              </Link>
            </div>

            {/* Right Section */}
            <div className="d-none d-md-flex justify-content-end align-items-center gap-4" style={{ flexBasis: '33.33%' }}>
              {/* Currency Selector */}
              <div className="border px-2 py-1 rounded">
                {/* INR ₹ */}
                USD $
              </div>

              {/* Language Selector */}
              <div className="border px-2 py-1 rounded">
                English
              </div>

              {/* Icons */}
              <div className="d-flex align-items-center gap-3">
                <div className="search-icon" onClick={toggleSearch} style={{ position: 'relative', cursor: 'pointer' }}>
                  <Search className="cursor-pointer" size={20} />
                </div>
                <Person className="cursor-pointer" size={24} />

                <div className="cart-icon" onClick={toggleWishList} style={{ position: 'relative', cursor: 'pointer' }}>
                <Heart className="cursor-pointer position-relative" size={20} />
                 
                  <span
                    className="position-absolute top-0 start-100 translate-middle text-white rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: '20px',
                      height: '20px',
                      fontSize: '10px',
                      transform: 'translate(-50%, -50%)',
                      borderColor: '#0000',
                      border: '2px solid',
                      backgroundColor: '#B37E56',
                    }}
                  >
                    {totalWishlistItems <= 9? totalWishlistItems: "9+"}
                  </span>
                </div>
                <div className="cart-icon" onClick={toggleCart} style={{ position: 'relative', cursor: 'pointer' }}>
                  <Bag size={20} />
                  <span
                    className="position-absolute top-0 start-100 translate-middle text-white rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: '20px',
                      height: '20px',
                      fontSize: '10px',
                      transform: 'translate(-50%, -50%)',
                      borderColor: '#0000',
                      border: '2px solid',
                      backgroundColor: '#B37E56',
                    }}
                  >
                    {totalItems <= 9? totalItems: "9+"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CartModal show={showCart} handleClose={toggleCart} />
      <WishListModal show={showWishList} handleClose={toggleWishList} />
      <SearchModal show={showSearch} handleClose={toggleSearch} />
      {/* Offset Padding to Prevent Content Overlap */}
      <div style={{ paddingTop: '200px' }}></div>
    </>
  );
};

export default Header;
