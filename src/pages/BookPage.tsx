import React, { useState } from 'react';
import { Star, Share2, BookOpen, MessageSquare, Heart, Eye, Calendar, User } from 'lucide-react';
import { PageType } from '../App';

interface BookPageProps {
  bookId: string | null;
  onNavigate: (page: PageType) => void;
}

export const BookPage: React.FC<BookPageProps> = ({ bookId, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('chapters');
  const [isFollowing, setIsFollowing] = useState(false);

  const book = {
    id: '1',
    title: 'The Digital Frontier',
    author: 'Alex Chen',
    authorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    genre: 'Science Fiction',
    cover: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    synopsis: 'In a world where reality and digital existence blur, a young programmer discovers a conspiracy that threatens both worlds. As she delves deeper into the mystery, she must navigate through layers of virtual reality, corporate espionage, and her own past to uncover the truth.',
    tags: ['Cyberpunk', 'Thriller', 'AI', 'Virtual Reality'],
    stats: {
      likes: 1247,
      views: 12500,
      chapters: 24,
      words: 89000,
      rating: 4.8,
      reviews: 156
    },
    status: 'Ongoing',
    lastUpdated: '2 hours ago',
    publishedDate: 'March 15, 2024'
  };

  const chapters = [
    { id: '1', title: 'Chapter 1: The Awakening', publishedDate: '2024-03-15', wordCount: 3500, likes: 89, comments: 12 },
    { id: '2', title: 'Chapter 2: Digital Shadows', publishedDate: '2024-03-18', wordCount: 3200, likes: 76, comments: 8 },
    { id: '3', title: 'Chapter 3: The Glitch', publishedDate: '2024-03-20', wordCount: 3800, likes: 94, comments: 15 },
    { id: '4', title: 'Chapter 4: Virtual Conspiracy', publishedDate: '2024-03-22', wordCount: 4100, likes: 102, comments: 18 }
  ];

  const reviews = [
    {
      id: '1',
      reviewer: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      date: '2 days ago',
      content: 'Absolutely captivating! The way Alex builds the world feels so realistic and immersive. The characters are well-developed and the plot keeps you on the edge of your seat.'
    },
    {
      id: '2',
      reviewer: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 4,
      date: '1 week ago',
      content: 'Great concept and execution. The technical details are impressive and the pacing is excellent. Looking forward to seeing how the story develops.'
    }
  ];

  const tabs = [
    { id: 'chapters', label: 'Chapters' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'about', label: 'About' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Book Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
          <img
            src={book.cover}
            alt={book.title}
            className="w-64 h-96 rounded-lg object-cover mx-auto md:mx-0"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{book.genre}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                book.status === 'Complete' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
              }`}>
                {book.status}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{book.title}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={book.authorAvatar}
                alt={book.author}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-lg text-gray-600 dark:text-gray-400">by {book.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Published {book.publishedDate}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="font-medium">{book.stats.rating}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({book.stats.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-5 w-5 text-gray-400 mr-1" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{book.stats.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-5 w-5 text-gray-400 mr-1" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{book.stats.likes} likes</span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{book.synopsis}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isFollowing
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button className="flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
              <button className="flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <BookOpen className="h-4 w-4 mr-2" />
                Read First Chapter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{book.stats.chapters}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Chapters</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{book.stats.words.toLocaleString()}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{book.stats.views.toLocaleString()}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Views</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{book.stats.likes}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Likes</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1 p-6 border-b border-gray-200 dark:border-gray-700">
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

        <div className="p-6">
          {activeTab === 'chapters' && (
            <div className="space-y-4">
              {chapters.map((chapter) => (
                <div key={chapter.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{chapter.title}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{chapter.publishedDate}</span>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                    <span>{chapter.wordCount.toLocaleString()} words</span>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {chapter.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {chapter.comments}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={review.avatar}
                      alt={review.reviewer}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{review.reviewer}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{review.content}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About this book</h3>
                <p className="text-gray-600 dark:text-gray-400">{book.synopsis}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Author</h3>
                <div className="flex items-center space-x-3">
                  <img
                    src={book.authorAvatar}
                    alt={book.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{book.author}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Science fiction writer</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};