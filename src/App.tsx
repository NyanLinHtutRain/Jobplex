import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import ResumeBuilder from './components/ResumeBuilder';
import { LogOut, Briefcase, FileText, LayoutDashboard, AlertCircle } from 'lucide-react';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'resumes'>('dashboard');
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) setShowAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
        <div className="max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Configuration Required</h2>
          <p className="text-slate-600 mb-6">
            Please set your Supabase credentials in the environment variables to use HireStream.
          </p>
          <div className="text-left bg-slate-50 p-4 rounded-lg font-mono text-xs text-slate-500 overflow-x-auto">
            <p>VITE_SUPABASE_URL=...</p>
            <p>VITE_SUPABASE_ANON_KEY=...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show Landing Page if not logged in and not explicitly showing Auth
  if (!session && !showAuth) {
    return <LandingPage onLoginClick={() => setShowAuth(true)} />;
  }

  // Show Auth Page if explicitly requested and not logged in
  if (!session && showAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-white border-b border-slate-200 p-4 flex justify-between items-center">
          <button 
            onClick={() => setShowAuth(false)}
            className="flex items-center gap-2 text-sm font-bold text-slate-900"
          >
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <Briefcase className="text-white w-4 h-4" />
            </div>
            HireStream
          </button>
          <button 
            onClick={() => setShowAuth(false)}
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            Back to Search
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center p-4">
          <Auth onAuthSuccess={() => setShowAuth(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">HireStream</span>
              </div>
              
              <div className="hidden sm:flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'dashboard' 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('resumes')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'resumes' 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Resumes
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-slate-900">{session.user.email}</p>
                <p className="text-xs text-slate-500">Candidate</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === 'dashboard' ? (
          <Dashboard session={session} />
        ) : (
          <ResumeBuilder session={session} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">© 2026 HireStream. Built for modern job seekers.</p>
        </div>
      </footer>
    </div>
  );
}
