import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchPopularProducts, fetchProductsByCategory, fetchProductById } from '../services/productService';

// Create a Context for the product data
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch popular products from the backend
  const loadPopularProducts = async () => {
    try {
      setLoading(true);
      const popularProducts = await fetchPopularProducts();
      setPopularProducts(popularProducts);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products by category from the backend
  const loadProductsByCategory = async (category, subcategory = '', params = {}) => {
    try {
      setLoading(true);
      const products = await fetchProductsByCategory(category, subcategory, params);
      setProducts(products);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single product by ID
  const loadProductById = async (category, subcategory, productId) => {
    try {
      setLoading(true);
      const product = await fetchProductById(category, subcategory, productId);
      return product;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load the popular products on initial mount
    loadPopularProducts();
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      popularProducts,
      loading,
      error,
      loadPopularProducts,
      loadProductsByCategory,
      loadProductById,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProductContext = () => {
  return useContext(ProductContext);
};
