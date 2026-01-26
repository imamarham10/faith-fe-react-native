/**
 * Content Service
 * Handles all content-related API calls
 */

import {apiClient} from './apiClient';
import {DailyContent, FaithType} from '@types';

export const contentService = {
  /**
   * Fetch daily content for a specific faith
   */
  getDailyContent: async (faith: FaithType, date?: string): Promise<DailyContent> => {
    const endpoint = `/content/daily?faith=${faith}${date ? `&date=${date}` : ''}`;
    return apiClient.get<DailyContent>(endpoint);
  },

  /**
   * Fetch content by ID
   */
  getContentById: async (contentId: string): Promise<DailyContent> => {
    return apiClient.get<DailyContent>(`/content/${contentId}`);
  },

  /**
   * Fetch historical content
   */
  getHistoricalContent: async (
    faith: FaithType,
    limit: number = 10,
  ): Promise<DailyContent[]> => {
    const endpoint = `/content/historical?faith=${faith}&limit=${limit}`;
    return apiClient.get<DailyContent[]>(endpoint);
  },
};
