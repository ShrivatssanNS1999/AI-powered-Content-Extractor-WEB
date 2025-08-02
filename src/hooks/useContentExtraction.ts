import { useState, useEffect, useCallback } from 'react';
import { ExtractedContent, FilterOptions, ApiResponse } from '../types';
import { ContentExtractionService } from '../services/api';

const STORAGE_KEY = 'extracted-content';

export function useContentExtraction() {
  const [contents, setContents] = useState<ExtractedContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setContents(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load stored content:', error);
      }
    }
  }, []);

  const saveToStorage = useCallback((newContents: ExtractedContent[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContents));
  }, []);

  const extractContent = useCallback(async (url: string) => {
    if (!ContentExtractionService.validateUrl(url)) {
      setError('Please enter a valid URL (must start with http:// or https://)');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response: ApiResponse = await ContentExtractionService.extractContent(url);
      
      const newContent: ExtractedContent = {
        id: Date.now().toString(),
        url,
        summary: response.summary,
        keyPoints: response.keyPoints,
        extractedAt: new Date().toISOString(),
        domain: ContentExtractionService.getDomainFromUrl(url),
      };

      const updatedContents = [newContent, ...contents];
      setContents(updatedContents);
      saveToStorage(updatedContents);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [contents, saveToStorage]);

  const deleteContent = useCallback((id: string) => {
    const updatedContents = contents.filter(c => c.id !== id);
    setContents(updatedContents);
    saveToStorage(updatedContents);
  }, [contents, saveToStorage]);

  const clearAllContent = useCallback(() => {
    setContents([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const filterContents = useCallback((filters: FilterOptions): ExtractedContent[] => {
    let filtered = [...contents];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(content => 
        content.summary.toLowerCase().includes(searchTerm) ||
        content.keyPoints.some(point => point.toLowerCase().includes(searchTerm)) ||
        content.url.toLowerCase().includes(searchTerm) ||
        content.domain.toLowerCase().includes(searchTerm)
      );
    }

    // Domain filter
    if (filters.domain && filters.domain !== 'all') {
      filtered = filtered.filter(content => content.domain === filters.domain);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          cutoffDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter(content => 
        new Date(content.extractedAt) >= cutoffDate
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (filters.sortBy) {
        case 'date':
          aValue = new Date(a.extractedAt).getTime();
          bValue = new Date(b.extractedAt).getTime();
          break;
        case 'domain':
          aValue = a.domain;
          bValue = b.domain;
          break;
        case 'length':
          aValue = a.summary.length;
          bValue = b.summary.length;
          break;
        default:
          return 0;
      }

      if (filters.sortOrder === 'desc') {
        return aValue < bValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });

    return filtered;
  }, [contents]);

  return {
    contents,
    isLoading,
    error,
    extractContent,
    deleteContent,
    clearAllContent,
    filterContents,
  };
}