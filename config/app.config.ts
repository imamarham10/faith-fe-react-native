/**
 * Application Configuration
 * Centralized app configuration values
 */

export const AppConfig = {
  // API Configuration
  api: {
    timeout: 30000,
    retryAttempts: 3,
  },

  // Feature Flags
  features: {
    enableNotifications: true,
    enableOfflineMode: true,
    enableAnalytics: true,
  },

  // App Settings
  settings: {
    defaultLanguage: 'en',
    defaultTheme: 'light',
    cacheExpiration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  },
} as const;
