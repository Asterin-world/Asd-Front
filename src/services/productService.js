// src/services/productService.js
import { get, post, put, del } from './apiService';

// Fetch products by category and subcategory with optional filters, sorting, and pagination
export const fetchProductsByCategory = (category, subcategory = '', params = {}) => {
  // Construct the query string for filters and sorting
  const queryString = new URLSearchParams(params).toString();
  const endpoint = `/products/collection/${category}${subcategory ? `/${subcategory}` : ''}?${queryString}`;
  return get(endpoint);
};

// Fetch products by category and subcategory with optional filters, sorting, and pagination
export const fetchProductById = (category, subcategory = '', id) => {
  // Construct the query string for filters and sorting
  const endpoint = `/products/collection/${category}${subcategory ? `/${subcategory}` : ''}/product/${id}`;
  return get(endpoint);
};

export const fetchPopularProducts = () => {
  const endpoint = `/products/best-selling-featured`;
  return get(endpoint);
}

// Create a new product (example API)
export const createProduct = (productData) => {
  return post('/products', productData);
};

// Update a product by ID (example API)
export const updateProduct = (productId, productData) => {
  return put(`/products/${productId}`, productData);
};

// Delete a product by ID (example API)
export const deleteProduct = (productId) => {
  return del(`/products/${productId}`);
};
