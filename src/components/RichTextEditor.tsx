import React, { useState } from 'react';
import { Bold, Italic, Underline, Link, List, ListOrdered, Quote, Code, Image, Save } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, placeholder = 'Start writing...' }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toolbarButtons = [
    { icon: Bold, action: 'bold', title: 'Bold' },
    { icon: Italic, action: 'italic', title: 'Italic' },
    { icon: Underline, action: 'underline', title: 'Underline' },
    { icon: Link, action: 'link', title: 'Link' },
    { icon: List, action: 'bulletList', title: 'Bullet List' },
    { icon: ListOrdered, action: 'orderedList', title: 'Numbered List' },
    { icon: Quote, action: 'blockquote', title: 'Quote' },
    { icon: Code, action: 'code', title: 'Code' },
    { icon: Image, action: 'image', title: 'Image' },
  ];

  const handleToolbarAction = (action: string) => {
    document.execCommand(action, false);
  };

  return (
    <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : 'h-full'}`}>
      {/* Toolbar */}
      <div className="flex items-center space-x-2 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {toolbarButtons.map((button) => {
          const Icon = button.icon;
          return (
            <button
              key={button.action}
              onClick={() => handleToolbarAction(button.action)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title={button.title}
            >
              <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          );
        })}
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div
          contentEditable
          className="min-h-full outline-none prose prose-lg max-w-none dark:prose-invert"
          style={{ minHeight: '400px' }}
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
          suppressContentEditableWarning
          placeholder={placeholder}
        >
          {content || (
            <p className="text-gray-400 dark:text-gray-500">
              {placeholder}
            </p>
          )}
        </div>
      </div>

      {/* Writing Stats */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>0 words</span>
            <span>0 characters</span>
            <span>~0 min read</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600 dark:text-green-400">Auto-saved</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};