'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import axiosInstance from '@/lib/axios';

interface EventSearchProps {
  onSearch: (searchTerm: string) => void;
}

export default function EventSearch({ onSearch }: EventSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length >= 2) {
        searchSuggestions();
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const searchSuggestions = async () => {
    try {
      setIsSearching(true);
      const response = await axiosInstance.get(`/api/events/search?q=${searchTerm}&limit=5`);
      const results = response.data;
      const eventNames = results.map(event => event.name);
      setSuggestions(eventNames);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Search suggestions error:', error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch('');
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sự kiện..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-12 pr-10"
              onFocus={() => setShowSuggestions(true)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="loading loading-spinner loading-sm"></div>
              </div>
            )}
          </div>

          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg">
              <ul className="py-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-2 text-left hover:bg-base-200 transition-colors"
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>{suggestion}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={!searchTerm.trim() || isSearching}
        >
          {isSearching ? (
            <>
              <div className="loading loading-spinner loading-sm"></div>
              Tìm kiếm
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-1" />
              Tìm kiếm
            </>
          )}
        </button>

        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="btn btn-outline btn-sm"
          >
            <X className="w-4 h-4 mr-1" />
            Xóa
          </button>
        )}
      </form>

      {/* Popular Searches */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-sm text-base-content/70">Tìm kiếm phổ biến:</span>
        {['Tập luyện', 'Thi đấu', 'Từ thiện', 'Workshop', '5km', '10km'].map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => {
              setSearchTerm(term);
              onSearch(term);
            }}
            className="badge badge-outline badge-sm hover:badge-primary cursor-pointer transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
