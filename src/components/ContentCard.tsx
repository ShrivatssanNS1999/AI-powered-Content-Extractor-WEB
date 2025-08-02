import React, { useState } from 'react';
import { ExternalLink, Calendar, Globe, Trash2, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { ExtractedContent } from '../types';

interface ContentCardProps {
  content: ExtractedContent;
  onDelete: (id: string) => void;
}

export function ContentCard({ content, onDelete }: ContentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const exportData = () => {
    const exportContent = {
      url: content.url,
      summary: content.summary,
      keyPoints: content.keyPoints,
      extractedAt: content.extractedAt,
    };
    
    const dataStr = JSON.stringify(exportContent, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `content-${content.domain}-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                {content.domain}
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {formatDate(content.extractedAt)}
              </div>
            </div>
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 group truncate"
            >
              <span className="truncate">{content.url}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(JSON.stringify({ summary: content.summary, keyPoints: content.keyPoints }, null, 2))}
              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Copy content"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={exportData}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
              title="Export as JSON"
            >
              Export
            </button>
            <button
              onClick={() => onDelete(content.id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Summary */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Summary</h4>
          <p className="text-gray-700 leading-relaxed">
            {isExpanded ? content.summary : truncateText(content.summary, 200)}
            {content.summary.length > 200 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-2 text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    Show less <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </p>
        </div>

        {/* Key Points */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Points</h4>
          <ul className="space-y-2">
            {content.keyPoints.slice(0, isExpanded ? undefined : 3).map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>{point.replace(/^\*+\s*/, '')}</span>
              </li>
            ))}
            {!isExpanded && content.keyPoints.length > 3 && (
              <li className="text-sm">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                >
                  Show {content.keyPoints.length - 3} more points <ChevronDown className="w-3 h-3" />
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}