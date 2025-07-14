import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { WritingPage } from './pages/WritingPage';
import { DiscoveryPage } from './pages/DiscoveryPage';
import { ProfilePage } from './pages/ProfilePage';
import { BookPage } from './pages/BookPage';
import { CommunityPage } from './pages/CommunityPage';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

export type PageType = 'home' | 'writing' | 'discovery' | 'profile' | 'book' | 'community';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'writing':
        return <WritingPage onNavigate={setCurrentPage} />;
      case 'discovery':
        return <DiscoveryPage onNavigate={setCurrentPage} setSelectedBook={setSelectedBookId} />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} />;
      case 'book':
        return <BookPage bookId={selectedBookId} onNavigate={setCurrentPage} />;
      case 'community':
        return <CommunityPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
          <main className="pt-16">
            {renderPage()}
          </main>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;