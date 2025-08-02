import React from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterControlsProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableDomains: string[];
  totalCount: number;
  filteredCount: number;
}

export function FilterControls({ 
  filters, 
  onFiltersChange, 
  availableDomains, 
  totalCount, 
  filteredCount 
}: FilterControlsProps) {
  const updateFilter = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Filter className="w-5 h-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">Filters & Search</h3>
          <p className="text-sm text-gray-600">
            Showing {filteredCount} of {totalCount} extracted contents
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search content..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        {/* Domain Filter */}
        <select
          value={filters.domain}
          onChange={(e) => updateFilter('domain', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        >
          <option value="all">All domains</option>
          {availableDomains.map(domain => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>

        {/* Date Range */}
        <select
          value={filters.dateRange}
          onChange={(e) => updateFilter('dateRange', e.target.value as FilterOptions['dateRange'])}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        >
          <option value="all">All time</option>
          <option value="today">Today</option>
          <option value="week">Past week</option>
          <option value="month">Past month</option>
        </select>

        {/* Sort Controls */}
        <div className="flex gap-2">
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value as FilterOptions['sortBy'])}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          >
            <option value="date">Sort by date</option>
            <option value="domain">Sort by domain</option>
            <option value="length">Sort by length</option>
          </select>
          <button
            onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-purple-500 transition-colors"
          >
            {filters.sortOrder === 'asc' ? (
              <SortAsc className="w-4 h-4 text-gray-600" />
            ) : (
              <SortDesc className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}