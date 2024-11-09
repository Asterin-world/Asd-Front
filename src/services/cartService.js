// src/services/cartService.js
import { get, post, put, del } from './apiService';

// API call to get cart items for a logged-in user
export const getCartItemsAPI = () => get('/cart');

// API call to add an item to the cart
export const addItemToCartAPI = (item) => post('/cart', item);

// API call to update the quantity of a cart item
export const updateCartItemAPI = (itemId, quantity) => put(`/cart/${itemId}`, { quantity });

// API call to remove an item from the cart
export const removeItemFromCartAPI = (itemId) => del(`/cart/${itemId}`);
