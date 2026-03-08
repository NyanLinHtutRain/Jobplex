import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import ResumeBuilder from './components/ResumeBuilder';
import AutoApplyAgent from './components/AutoApplyAgent';

import { Briefcase, Bell, User as UserIcon } from 'lucide-react';

export default function App() {
  // We remove all auth logic and simply track which page the user wants to see
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'resumes' | 'agent'>('landing');

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
   */
  const handleGlobalClick = (e: React.MouseEvent) => {
    const text = (e.target as HTMLElement).textContent;
    if (!text) return;

    if (text === 'Find Jobs') setCurrentPage('landing');
    if (text === 'Resume Builder') setCurrentPage('resumes');
    if (text === 'My Applications') setCurrentPage('dashboard');
    if (text === 'Auto-Apply Agent') setCurrentPage('agent');
    if (text === 'Jobplex') setCurrentPage('landing');
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" onClick={handleGlobalClick}>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center shadow-sm text-white">
                <Briefcase size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Jobplex</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8 h-full">
              <span className={`h-full flex items-center text-sm font-bold cursor-pointer transition-colors ${currentPage === 'landing' ? 'text-red-500 border-b-2 border-red-500 py-5 mt-5' : 'text-slate-500 hover:text-slate-900'}`}>Find Jobs</span>
              <span className={`h-full flex items-center text-sm font-bold cursor-pointer transition-colors ${currentPage === 'agent' ? 'text-red-500 border-b-2 border-red-500 py-5 mt-5' : 'text-slate-500 hover:text-slate-900'}`}>Auto-Apply Agent</span>
              <span className={`h-full flex items-center text-sm font-bold cursor-pointer transition-colors ${currentPage === 'resumes' ? 'text-red-500 border-b-2 border-red-500 py-5 mt-5' : 'text-slate-500 hover:text-slate-900'}`}>Resume Builder</span>
              <span className={`h-full flex items-center text-sm font-bold cursor-pointer transition-colors ${currentPage === 'dashboard' ? 'text-red-500 border-b-2 border-red-500 py-5 mt-5' : 'text-slate-500 hover:text-slate-900'}`}>My Applications</span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5 text-slate-600" />
            </button>
            <button className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden text-slate-500">
              <UserIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
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

        {currentPage === 'agent' && (
          <AutoApplyAgent />
        )}
      </main>
    </div>
  );
}
