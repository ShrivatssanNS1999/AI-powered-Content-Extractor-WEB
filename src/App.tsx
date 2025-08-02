import React, { useState, useMemo } from 'react';
import { Brain, Download, Trash2, Github } from 'lucide-react';
import { URLInput } from './components/URLInput';
import { FilterControls } from './components/FilterControls';
import { ContentCard } from './components/ContentCard';
import { EmptyState } from './components/EmptyState';
import { useContentExtraction } from './hooks/useContentExtraction';
import { FilterOptions } from './types';

function App() {
  const {
    contents,
    isLoading,
    error,
    extractContent,
    deleteContent,
    clearAllContent,
    filterContents,
  } = useContentExtraction();

  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    domain: 'all',
    dateRange: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const filteredContents = useMemo(() => {
    return filterContents(filters);
  }, [filterContents, filters]);

  const availableDomains = useMemo(() => {
    const domains = Array.from(new Set(contents.map(c => c.domain)));
    return domains.sort();
  }, [contents]);

  const exportAllData = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      totalItems: contents.length,
      contents: contents.map(({ id, ...rest }) => rest),
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `content-extraction-export-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Content Extractor</h1>
                <p className="text-sm text-gray-600">Extract and analyze web content with AI</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="View on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              
              {contents.length > 0 && (
                <>
                  <button
                    onClick={exportAllData}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export All
                  </button>
                  
                  <button
                    onClick={clearAllContent}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <URLInput
          onExtract={extractContent}
          isLoading={isLoading}
          error={error}
        />

        {contents.length > 0 && (
          <FilterControls
            filters={filters}
            onFiltersChange={setFilters}
            availableDomains={availableDomains}
            totalCount={contents.length}
            filteredCount={filteredContents.length}
          />
        )}

        {/* Content Grid */}
        <div className="space-y-6">
          {filteredContents.length > 0 ? (
            <div className="grid gap-6">
              {filteredContents.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  onDelete={deleteContent}
                />
              ))}
            </div>
          ) : (
            <EmptyState 
              hasContent={contents.length > 0}
              isFiltered={filters.search !== '' || filters.domain !== 'all' || filters.dateRange !== 'all'}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Built with React, TypeScript, and Tailwind CSS. 
              <span className="block mt-1">
                Powered by <span className="font-semibold">AI Content Extraction API</span>
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;