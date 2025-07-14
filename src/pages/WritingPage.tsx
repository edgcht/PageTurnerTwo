import React, { useState } from 'react';
import { Save, Eye, Share2, MoreHorizontal, Plus } from 'lucide-react';
import { PageType } from '../App';
import { RichTextEditor } from '../components/RichTextEditor';
import { ChapterList } from '../components/ChapterList';
import { CreateBookModal } from '../components/CreateBookModal';
import { useBooks, useChapters } from '../hooks/useBooks';
import { useAuth } from '../contexts/AuthContext';

interface WritingPageProps {
  onNavigate: (page: PageType) => void;
}

export const WritingPage: React.FC<WritingPageProps> = ({ onNavigate }) => {
  const { user, profile } = useAuth();
  const { books, fetchBooks, createBook } = useBooks();
  const { chapters, fetchChapters, createChapter, updateChapter } = useChapters();
  
  const [selectedChapter, setSelectedChapter] = useState<string>('1');
  const [showChapterList, setShowChapterList] = useState(true);
  const [content, setContent] = useState('');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);

  React.useEffect(() => {
    if (user) {
      fetchBooks({ author_id: user.id });
    }
  }, [user]);

  React.useEffect(() => {
    if (selectedBook) {
      fetchChapters(selectedBook);
    }
  }, [selectedBook]);

  const currentBook = books.find(book => book.id === selectedBook);

  const handleSaveChapter = async () => {
    if (!selectedChapter || !currentBook) return;
    
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length;
    
    await updateChapter(selectedChapter, {
      content,
      word_count: wordCount,
      updated_at: new Date().toISOString()
    });
  };

  const handleBookCreated = (id: string) => {
    setSelectedBook(id);
    setShowBookModal(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please sign in to start writing
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You need to be logged in to access the writing interface.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - Chapter List */}
      {showChapterList && (
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-2">
            <select
              value={selectedBook || ''}
              onChange={e => setSelectedBook(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="" disabled>
                Select a Book
              </option>
              {books.map(book => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowBookModal(true)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Book
              </button>
              {currentBook && (
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Plus className="h-4 w-4 mr-2" />
                  New Chapter
                </button>
              )}
            </div>
          </div>
          
          {currentBook && (
            <ChapterList
              chapters={chapters}
              selectedChapter={selectedChapter}
              onSelectChapter={setSelectedChapter}
            />
          )}
        </div>
      )}

      {/* Main Writing Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSaveChapter}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Save className="h-4 w-4 mr-2 inline" />
              Save
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Chapter 1 • 2,450 words
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Eye className="h-4 w-4 mr-2 inline" />
              Preview
            </button>
            <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Share2 className="h-4 w-4 mr-2 inline" />
              Share
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Save className="h-4 w-4 mr-2 inline" />
              Save
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <MoreHorizontal className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 bg-white dark:bg-gray-800">
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Start writing your chapter..."
          />
        </div>

        {/* Status Bar */}
        <div className="bg-gray-100 dark:bg-gray-700 px-6 py-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Auto-saved 2 minutes ago</span>
            <span>•</span>
            <span>Draft</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>1,247 words</span>
            <span>•</span>
            <span>~5 min read</span>
          </div>
        </div>
      </div>
    </div>
    <CreateBookModal
      isOpen={showBookModal}
      onClose={() => setShowBookModal(false)}
      onCreated={handleBookCreated}
      createBook={createBook}
    />
  </>
  );
};