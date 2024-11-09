// src/components/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { CartProvider } from '../hooks/CartContext';
import CartModal
 from './CartModal';
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <CartModal />
      <Footer />
    </>
  );
};

export default Layout;
