import React from 'react';
import { FileText, Search } from 'lucide-react';

interface EmptyStateProps {
  hasContent: boolean;
  isFiltered: boolean;
}

export function EmptyState({ hasContent, isFiltered }: EmptyStateProps) {
  if (isFiltered) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No matching results</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Try adjusting your filters or search terms to find the content you're looking for.
        </p>
      </div>
    );
  }

  if (!hasContent) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No content yet</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Start by entering a URL above to extract and analyze content with AI. Your extracted content will appear here.
        </p>
      </div>
    );
  }

  return null;
}