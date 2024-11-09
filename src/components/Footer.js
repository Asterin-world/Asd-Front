import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaPinterest, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-5 w-100" style={{ backgroundColor: "#F9F3EE" }}>
      <div className="container-fluid px-5">
        <div className="row">
          {/* Join the Community */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3" style={{ textDecoration: "none" }}>JOIN THE COMMUNITY</h5>
            <p>Sign up for exclusive sales, fresh launches, style advice, and more!</p>
            <form className="d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Email"
                aria-label="Email"
              />
              <button className="btn btn-dark" type="submit">
                Subscribe
              </button>
            </form>
          </div>

          {/* New Menu */}
          <div className="col-md-2 mb-4">
            <h5 className="mb-3">NEW MENU</h5>
            <ul className="list-unstyled">
              <li className="mb-1"><Link className="text-dark text-decoration-none" to="/products/mens">Men's</Link></li>
              <li className="mb-1"><Link className="text-dark text-decoration-none" to="/products/womens">Women's</Link></li>
              <li className="mb-1"><a href="#personalized" className="text-dark text-decoration-none">Personalized</a></li>
              <li className="mb-1"><Link className="text-dark text-decoration-none" to="/blogs">Blogs</Link></li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="col-md-2 mb-4">
            <h5 className="mb-3">COMPANY INFO</h5>
            <ul className="list-unstyled">
              <li className="mb-1"><Link className="text-dark text-decoration-none" to="/more-at-asd/about">About Us</Link></li>
              <li className="mb-1"><Link className="text-dark text-decoration-none" to="/company-info/international-supply">International Supply</Link></li>
              <li className="mb-1"><Link className="text-dark text-decoration-none" to="/company-info/privacy-policy">Privacy Policy</Link></li>
              <li className="mb-1"><Link className="text-dark text-decoration-none" to="/company-info/terms-of-service">Terms Of Service</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-md-2 mb-4">
            <h5 className="mb-3">CUSTOMER SERVICE</h5>
            <ul className="list-unstyled">
              <li className="mb-1"><a href="#track" className="text-dark text-decoration-none">Track Your Order</a></li>
              <li className="mb-1"><Link className="text-dark text-decoration-none" to="/customer-service/shipping-policy">Shipping Policy</Link></li>
              <li className="mb-1"><Link className="text-dark text-decoration-none" to="/customer-service/return-&-exchange-policy">Return & Exchange Policy</Link></li>
              <li className="mb-1"><Link className="text-dark text-decoration-none" to="/customer-service/refund-policy">Refund Policy</Link></li>
              <li className="mb-1"><Link className="text-dark text-decoration-none" to="/customer-service/supportfaq">Support & FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-md-2 mb-4">
            <h5 className="mb-3">CONTACT US</h5>
            <p>
            <span className="mb-1"><strong>Hong Kong</strong><br /></span>
            <span className="mb-1"><a href="tel:+85296845389" className="text-dark text-decoration-none">+852 9684 5389</a><br /></span>
            <span className="mb-1"><a href="mailto:aprilshine@gmail.com" className="text-dark text-decoration-none">aprilshine@gmail.com</a></span>
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="row mt-3 py-3">
          <div className="col-12">
            <hr />
            {/* Footer Bottom Section */}
            <div className="d-flex justify-content-center align-items-center">
              {/* Social Media Icons */}
              <div className="d-flex justify-content align-items-center" style={{ flexBasis: '33.33%' }}>
                <a href="https://facebook.com" target="_blank" className="me-3 text-dark" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://in.pinterest.com/aprilshined/" target="_blank" className="me-3 text-dark" aria-label="Pinterest">
                  <FaPinterest />
                </a>
                <a href="https://www.instagram.com/aprilshine_diamond/" target="_blank" className="me-3 text-dark" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://youtube.com" target="_blank" className="me-3 text-dark" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>

              {/* Copyright Text */}
              <div className="text-center" style={{ flexBasis: '33.33%' }}>
                <p className="mb-0">© 2024 - APRILSHINE. All rights reserved.</p>
              </div>

              {/* Payment Options */}
              <div className="d-flex justify-content-end align-items-center" style={{ flexBasis: '33.33%' }}>
                <img src={`${process.env.PUBLIC_URL}/assets/payment-options/amex.png`} alt="AMEX" className="me-2" style={{ width: "70px", height: "35px" }} />
                <img src={`${process.env.PUBLIC_URL}/assets/payment-options/apple.png`} alt="APPLE PAY" className="me-2" style={{ width: "70px", height: "35px" }} />
                <img src={`${process.env.PUBLIC_URL}/assets/payment-options/gpay.png`} alt="G Pay" className="me-2" style={{ width: "70px", height: "35px" }} />
                <img src={`${process.env.PUBLIC_URL}/assets/payment-options/master.png`} alt="MASTER CARD" className="me-2" style={{ width: "70px", height: "35px" }} />
                <img src={`${process.env.PUBLIC_URL}/assets/payment-options/union.png`} alt="UNION PAY" className="me-2" style={{ width: "70px", height: "35px" }} />
                <img src={`${process.env.PUBLIC_URL}/assets/payment-options/visa.png`} alt="VISA" className="me-2" style={{ width: "70px", height: "35px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
