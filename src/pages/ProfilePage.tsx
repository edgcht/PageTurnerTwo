import React, { useState } from 'react';
import { Edit3, Settings, Share2, BookOpen, Star, Users, Calendar, Award, TrendingUp } from 'lucide-react';
import { PageType } from '../App';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../hooks/useBooks';

interface ProfilePageProps {
  onNavigate: (page: PageType) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, profile, updateProfile } = useAuth();
  const { books, fetchBooks } = useBooks();
  const [activeTab, setActiveTab] = useState('overview');

  React.useEffect(() => {
    if (user) {
      fetchBooks({ author_id: user.id });
    }
  }, [user]);

  const badges = [
    { id: 'first-book', name: 'First Book Published', icon: BookOpen },
    { id: 'prolific', name: 'Prolific Writer', icon: Edit3 },
    { id: 'reviewer', name: 'Helpful Reviewer', icon: Star },
    { id: 'consistent', name: 'Consistent Writer', icon: Calendar }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'books', label: 'Books' },
    { id: 'activity', label: 'Activity' },
    { id: 'reviews', label: 'Reviews' }
  ];

  if (!user || !profile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please sign in to view your profile
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={profile.avatar_url || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
            alt={profile.full_name}
            className="w-24 h-24 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.full_name}</h1>
              <span className="text-gray-500 dark:text-gray-400">@{profile.username}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{profile.bio}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
              <span>•</span>
              <span>{profile.location}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{(profile.stats as any)?.books_written || 0}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Books</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{(profile.stats as any)?.chapters_published || 0}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Chapters</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{((profile.stats as any)?.total_words || 0).toLocaleString()}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{(profile.stats as any)?.followers || 0}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{(profile.stats as any)?.following || 0}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{(profile.stats as any)?.likes_received || 0}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Likes</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex space-x-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Recent Books */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Books</h3>
              <div className="space-y-4">
                {books.slice(0, 3).map((book) => (
                  <div key={book.id} className="flex items-center space-x-4">
                    <img
                      src={book.cover_url || 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop'}
                      alt={book.title}
                      className="w-12 h-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{book.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{(book.stats as any)?.chapters || 0} chapters</span>
                        <span>•</span>
                        <span>{(book.stats as any)?.likes || 0} likes</span>
                        <span>•</span>
                        <span>{book.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
              <div className="grid grid-cols-2 gap-4">
                {badges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{badge.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'books' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <img
                  src={book.cover_url || 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop'}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{book.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{(book.stats as any)?.chapters || 0} chapters</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      book.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {book.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};