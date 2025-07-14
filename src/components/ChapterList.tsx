import React from 'react';
import { FileText, Edit3, Eye, MessageSquare } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  word_count: number;
  status: 'draft' | 'outline' | 'published';
  chapter_number: number;
}

interface ChapterListProps {
  chapters: Chapter[];
  selectedChapter: string;
  onSelectChapter: (chapterId: string) => void;
}

export const ChapterList: React.FC<ChapterListProps> = ({ chapters, selectedChapter, onSelectChapter }) => {
  const getStatusColor = (status: Chapter['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'outline':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: Chapter['status']) => {
    switch (status) {
      case 'published':
        return Eye;
      case 'draft':
        return Edit3;
      case 'outline':
        return FileText;
      default:
        return FileText;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-4">
        {chapters.map((chapter) => {
          const StatusIcon = getStatusIcon(chapter.status);
          return (
            <div
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedChapter === chapter.id
                  ? 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-600'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {chapter.title}
                </h3>
                <StatusIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{chapter.word_count.toLocaleString()} words</span>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(chapter.status)}`}>
                  {chapter.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};