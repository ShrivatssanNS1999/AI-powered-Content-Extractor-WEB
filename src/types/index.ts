export interface ExtractedContent {
  id: string;
  url: string;
  summary: string;
  keyPoints: string[];
  extractedAt: string;
  domain: string;
  title?: string;
}

export interface ApiResponse {
  summary: string;
  keyPoints: string[];
}

export interface FilterOptions {
  search: string;
  domain: string;
  dateRange: 'all' | 'today' | 'week' | 'month';
  sortBy: 'date' | 'domain' | 'length';
  sortOrder: 'asc' | 'desc';
}