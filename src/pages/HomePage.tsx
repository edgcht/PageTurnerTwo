import React from 'react';
import { TrendingUp, Clock, Star, Users, BookOpen, Award } from 'lucide-react';
import { PageType } from '../App';
import { useAuth } from '../contexts/AuthContext';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  const featuredBooks = [
    {
      id: '1',
      title: 'The Digital Frontier',
      author: 'Alex Chen',
      genre: 'Science Fiction',
      cover: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      likes: 1247,
      chapters: 24,
      status: 'Ongoing'
    },
    {
      id: '2',
      title: 'Echoes of Tomorrow',
      author: 'Maria Rodriguez',
      genre: 'Dystopian',
      cover: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      likes: 892,
      chapters: 18,
      status: 'Complete'
    },
    {
      id: '3',
      title: 'The Last Algorithm',
      author: 'Sam Williams',
      genre: 'Thriller',
      cover: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      likes: 1456,
      chapters: 32,
      status: 'Ongoing'
    }
  ];

  const stats = [
    { label: 'Active Writers', value: '12,459', icon: Users, color: 'text-blue-600' },
    { label: 'Books Published', value: '3,247', icon: BookOpen, color: 'text-green-600' },
    { label: 'Chapters Written', value: '89,421', icon: Clock, color: 'text-purple-600' },
    { label: 'Community Reviews', value: '56,789', icon: Star, color: 'text-orange-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Where Stories Come to Life
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Join a vibrant community of writers who collaborate, critique, and celebrate storytelling. 
          Write chapter by chapter, get feedback from fellow authors, and publish your masterpiece.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('writing')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Start Writing Today
          </button>
          <button
            onClick={() => onNavigate('discovery')}
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold"
          >
            Discover Amazing Stories
          </button>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`h-8 w-8 ${stat.color}`} />
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Featured Books */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Stories</h2>
          <button
            onClick={() => onNavigate('discovery')}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
          >
            View All →
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBooks.map((book) => (
            <div key={book.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <img
                src={book.cover}
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
                <p className="text-gray-600 dark:text-gray-400 mb-4">by {book.author}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{book.chapters} chapters</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {book.likes}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <Award className="h-12 w-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Join the Writer's Challenge</h3>
        <p className="text-lg mb-6 opacity-90">
          Write 50,000 words this month and earn exclusive badges. Connect with other writers and stay motivated!
        </p>
        <button
          onClick={() => onNavigate('community')}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
        >
          Join Challenge
        </button>
      </div>
    </div>
  );
};