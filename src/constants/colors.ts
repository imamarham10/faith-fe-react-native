/**
 * Application color constants
 * Centralized color management for consistent theming
 */

export const Colors = {
  // Primary colors
  primary: '#FF6B35',
  primaryDark: '#E55A2B',
  primaryLight: '#FF8C5A',

  // Secondary colors
  secondary: '#4ECDC4',
  secondaryDark: '#3BA39C',
  secondaryLight: '#6ED9D1',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
  grayLight: '#F5F5F5',
  grayMedium: '#CCCCCC',
  grayDark: '#333333',

  // Semantic colors
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',

  // Background colors
  background: '#FFFFFF',
  backgroundDark: '#1A1A1A',
  surface: '#F8F9FA',
  surfaceDark: '#2C2C2C',

  // Splash screen colors
  splashBlue: '#7CA5D6',

  // Text colors
  text: '#212529',
  textSecondary: '#6C757D',
  textLight: '#FFFFFF',
  textDark: '#000000',
} as const;

export type ColorKey = keyof typeof Colors;
