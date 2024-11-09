// src/services/apiService.js

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiService = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const options = {
    method,
    headers: defaultHeaders,
  };

  // Add the body if it's a POST, PUT, or PATCH request
  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong!');
    }

    return await response.json();
  } catch (error) {
    console.error(`API call to ${url} failed: ${error.message}`);
    throw error; // Propagate the error to the caller
  }
};

// Helper functions for each HTTP method
export const get = (endpoint, headers = {}) => apiService(endpoint, 'GET', null, headers);
export const post = (endpoint, body, headers = {}) => apiService(endpoint, 'POST', body, headers);
export const put = (endpoint, body, headers = {}) => apiService(endpoint, 'PUT', body, headers);
export const del = (endpoint, headers = {}) => apiService(endpoint, 'DELETE', null, headers);

export default apiService;