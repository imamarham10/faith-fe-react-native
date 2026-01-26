/**
 * Constants barrel export
 * Central export point for all application constants
 */

export * from './colors';
export * from './sizes';

// API Constants
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://api.yourapp.com/api';

export const API_ENDPOINTS = {
  AUTH: '/auth',
  CONTENT: '/content',
  USER: '/user',
} as const;

// App Constants
export const APP_NAME = 'Faith';
export const APP_VERSION = '1.0.0';

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_PREFERENCES: '@user_preferences',
  ONBOARDING_COMPLETE: '@onboarding_complete',
} as const;
