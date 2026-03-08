import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import ResumeBuilder from './components/ResumeBuilder';

export default function App() {
  // We remove all auth logic and simply track which page the user wants to see
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'resumes'>('landing');

  // We provide a mock session to components that might still expect it for data fetching (like Dashboard)
  const mockSession = {
    user: {
      id: "demo-user-id-123",
      email: "demo@jobplex.example.com"
    }
  };

  /**
   * NAVIGATION HANDLER
   * Since we redesigned the components to match screenshots, they have their own headers.
   * To keep navigation working without adding complex props to every component,
   * we can use a simple event delegation approach or just let the components call
   * a handleNavigate prop if we want to be cleaner.
   * 
   * Given the current structure, I'll use a wrapper that listens for clicks on 
   * the specific navigation text we added to the headers.
   */
  const handleGlobalClick = (e: React.MouseEvent) => {
    const text = (e.target as HTMLElement).textContent;
    if (!text) return;

    if (text === 'Find Jobs') setCurrentPage('landing');
    if (text === 'Resume Builder') setCurrentPage('resumes');
    if (text === 'My Applications') setCurrentPage('dashboard');
    if (text === 'Jobplex') setCurrentPage('landing');
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" onClick={handleGlobalClick}>
      <main className="flex-1">
        {currentPage === 'landing' && (
          <LandingPage onLoginClick={() => setCurrentPage('dashboard')} />
        )}
        
        {currentPage === 'dashboard' && (
          <Dashboard session={mockSession} />
        )}
        
        {currentPage === 'resumes' && (
          <ResumeBuilder session={mockSession} />
        )}
      </main>
    </div>
  );
}
