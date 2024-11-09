import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductListPage from './pages/ProductListPage';
import ProductDetails from './pages/ProductDetails';
import Layout from './components/Layout';
import AboutASD from './pages/AboutASD';
import ASDCare from './pages/ASDCare';
import SupportFAQ from './pages/SupportFAQ.js';
import IntlSupply from './pages/IntlSupply';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ShippingPolicy from './pages/ShippingPolicy.js';
import ExchangePolicy from './pages/ExchangePolicy.js';
import RefundPolicy from './pages/RefundPolicy.js';
import Blogs from './pages/Blogs.js';
import Checkout from './pages/Checkout.js';
import BlogPage from './pages/BlogPage.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Layout><Home /></Layout>} />

        {/* Header */} 
        <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
        <Route path="/blogs/:blogId" element={<Layout><BlogPage /></Layout>} />
        {/* Product List Routes */}
        <Route path="/products/:category" element={<Layout><ProductListPage /></Layout>} />
        <Route path="/products/:category/:subcategory" element={<Layout><ProductListPage /></Layout>} />

        {/* Product Details Routes */}
        <Route path="/products/:category/:subcategory/product/:productTitle" element={<Layout><ProductDetails /></Layout>} />
        <Route path="/products/:category/product/:productTitle" element={<Layout><ProductDetails /></Layout>} />
        <Route path="/products/product/:productTitle" element={<Layout><ProductDetails /></Layout>} />
        {/* More at ASD */}
        <Route path="/more-at-asd/about" element={<Layout><AboutASD /></Layout>} />
        <Route path="/more-at-asd/asd-care" element={<Layout><ASDCare /></Layout>} />
        <Route path="/more-at-asd/supportfaq" element={<Layout><SupportFAQ /></Layout>} />

        {/* Company Info */}  
        <Route path="/company-info/international-supply" element={<Layout><IntlSupply /></Layout>} />
        <Route path="/company-info/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/company-info/terms-of-service" element={<Layout><TermsOfService /></Layout>} />

        {/* Customer Service */} 
        <Route path="/customer-service/shipping-policy" element={<Layout><ShippingPolicy /></Layout>} />
        <Route path="/customer-service/return-&-exchange-policy" element={<Layout><ExchangePolicy /></Layout>} />
        <Route path="/customer-service/refund-policy" element={<Layout><RefundPolicy /></Layout>} />
        <Route path="/customer-service/supportfaq" element={<Layout><SupportFAQ /></Layout>} />

        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
