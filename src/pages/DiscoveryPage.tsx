import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Clock, Star, BookOpen, Users } from 'lucide-react';
import { PageType } from '../App';
import { useBooks } from '../hooks/useBooks';

interface DiscoveryPageProps {
  onNavigate: (page: PageType) => void;
  setSelectedBook: (bookId: string) => void;
}

export const DiscoveryPage: React.FC<DiscoveryPageProps> = ({ onNavigate, setSelectedBook }) => {
  const { books, loading, fetchBooks } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('trending');

  React.useEffect(() => {
    fetchBooks({ 
      status: 'published', 
      visibility: 'public',
      search: searchTerm || undefined,
      limit: 20 
    });
  }, [searchTerm, activeFilter]);

  const filters = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'popular', label: 'Popular', icon: Star },
    { id: 'complete', label: 'Complete', icon: BookOpen }
  ];

  const genres = ['All', 'Science Fiction', 'Fantasy', 'Romance', 'Mystery', 'Thriller', 'Horror', 'Literary Fiction'];

  const handleBookClick = (bookId: string) => {
    setSelectedBook(bookId);
    onNavigate('book');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks({ 
      status: 'published', 
      visibility: 'public',
      search: searchTerm || undefined 
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Discover Amazing Stories</h1>
        <p className="text-gray-600 dark:text-gray-400">Explore thousands of books written by our community</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search books, authors, or genres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <button type="submit" className="flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="h-5 w-5 mr-2" />
            Search
          </button>
        </form>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mb-6">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading books...</div>
        </div>
      ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => handleBookClick(book.id)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img
              src={book.cover_url || 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop'}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{book.genre}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  book.status === 'Complete' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {book.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{book.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">by {(book as any).profiles?.full_name || 'Unknown Author'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{book.synopsis}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400" />
                  {(book.stats as any)?.rating || 0}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {(book.stats as any)?.views || 0}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{(book.stats as any)?.chapters || 0} chapters</span>
                <span>Updated {new Date(book.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Load More Stories
        </button>
      </div>
    </div>
  );
};