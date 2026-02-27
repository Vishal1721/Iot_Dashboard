import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.username - Username
 * @param {string} userData.email - Email address
 * @param {string} userData.password - Password
 * @param {string} userData.firstName - First name
 * @param {string} userData.lastName - Last name
 * @param {string} userData.registerNumber - Register number
 * @param {number} userData.batch - Batch year
 * @returns {Promise} API response with user data and token
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Registration failed. Please try again.'
    );
  }
};

/**
 * Login user
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - Email address
 * @param {string} credentials.password - Password
 * @returns {Promise} API response with user data and token
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Login failed. Please check your credentials.'
    );
  }
};

/**
 * Get user profile
 * @returns {Promise} API response with user profile data
 */
export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch user profile.'
    );
  }
};

/**
 * Update user profile
 * @param {Object} userData - Updated user data
 * @returns {Promise} API response with updated user data
 */
export const updateUser = async (userData) => {
  try {
    const response = await api.patch('/users/profile', userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to update user profile.'
    );
  }
};

/**
 * Delete user account
 * @returns {Promise} API response
 */
export const deleteUser = async () => {
  try {
    const response = await api.delete('/users/profile');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to delete user account.'
    );
  }
};

/**
 * Get all users (Admin only)
 * @returns {Promise} API response with list of users
 */
export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch users.'
    );
  }
};

export default {
  registerUser,
  loginUser,
  getUserProfile,
  updateUser,
  deleteUser,
  getAllUsers,
};
