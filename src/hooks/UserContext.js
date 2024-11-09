// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create a UserContext to hold authentication and cart/wishlist state
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Track logged-in user
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Check localStorage for cart/wishlist and user data on initial load
    const savedUser = localStorage.getItem('user');
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setWishlist(savedWishlist);
      setCart(savedCart);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));

    // On login, you might want to merge localStorage cart/wishlist to backend here
    // syncLocalToBackend();
  };

  const logout = () => {
    setUser(null);
    setWishlist([]);
    setCart([]);
    localStorage.removeItem('user');
    localStorage.removeItem('wishlist');
    localStorage.removeItem('cart');
  };

  const addToWishlist = (product) => {
    if (user) {
      // Update wishlist in backend
    //   updateWishlistInBackend(product);
    } else {
      // Store in localStorage for non-logged-in user
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  const addToCart = (product) => {
    if (user) {
      // Update cart in backend
    //   updateCartInBackend(product);
    } else {
      // Store in localStorage for non-logged-in user
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        wishlist,
        cart,
        addToWishlist,
        addToCart,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
