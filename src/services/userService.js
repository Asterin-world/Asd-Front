// src/services/userService.js
import { post, get, del } from './apiService';

// Login user
export const login = async (email, password) => {
  return post('/auth/login', { email, password });
};

// Logout user (Optional: handle on the backend if needed)
export const logout = async () => {
  return get('/auth/logout'); // Use this if you have a logout endpoint on your backend
};

// Register new user
export const register = async (userData) => {
  return post('/auth/register', userData);
};

// Get user profile (for authenticated user)
export const getProfile = async () => {
  return get('/auth/profile');
};

// Update user profile
export const updateProfile = async (userData) => {
  return post('/auth/profile', userData);
};

// Delete user account
export const deleteUserAccount = async () => {
  return del('/auth/profile');
};
