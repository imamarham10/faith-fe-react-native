/**
 * Application type definitions
 * Centralized TypeScript type definitions
 */

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  faith?: FaithType;
  preferences?: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export type FaithType = 'hindu' | 'muslim' | 'christian' | 'jain' | 'sikh' | 'buddhist';

export interface UserPreferences {
  language: string;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
}

// Content Types
export interface DailyContent {
  id: string;
  date: string;
  faith: FaithType;
  verse: Verse;
  audio: AudioContent;
  wisdom: WisdomContent;
  image: ImageContent;
}

export interface Verse {
  text: string;
  source: string;
  language: string;
}

export interface AudioContent {
  url: string;
  duration: number;
  voiceProfile: string;
}

export interface WisdomContent {
  title: string;
  description: string;
  ritual?: string;
}

export interface ImageContent {
  url: string;
  alt: string;
}

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  FaithSelection: undefined;
  Home: undefined;
  Content: {contentId: string};
  Profile: undefined;
  Settings: undefined;
};

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Component Props Types
export interface BaseComponentProps {
  testID?: string;
}
