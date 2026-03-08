import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Briefcase, Clock, CheckCircle, XCircle, MoreVertical, Plus, Search, Building2, MapPin, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Application {
  id: string;
  job_title: string;
  company_name: string;
  status: 'Applied' | 'Interviewing' | 'Offered' | 'Rejected' | 'Withdrawn';
  applied_at: string;
}

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  postedAt: string;
}

interface DashboardProps {
  session?: any;
}

export default function Dashboard({ session }: DashboardProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<JobListing[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    if (!session?.user?.id) return;
    try {
      setLoading(true);
      const response = await fetch(`/api/applications?user_id=${session.user.id}`);
      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();
      setApplications(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchJobs = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(`/api/jobs/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error("Failed to search jobs");
      const data = await response.json();
      setSearchResults(data);
    } catch (err: any) {
      alert("Error searching jobs: " + err.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleApplyToJob = async (job: JobListing) => {
    if (!session?.user?.id) return;
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: session.user.id,
          job_title: job.title,
          company_name: job.company,
          status: 'Applied'
        }),
      });

      if (!response.ok) throw new Error("Failed to save application");
      
      const newApp = await response.json();
      setApplications([newApp, ...applications]);
      setShowSearchModal(false);
    } catch (err: any) {
      alert("Error saving application: " + err.message);
    }
  };

  async function updateStatus(id: string, newStatus: Application['status']) {
    if (!supabase) return;
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      setApplications(prev => 
        prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
      );
    } catch (err: any) {
      alert('Error updating status: ' + err.message);
    }
  }

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'Applied': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'Interviewing': return <Briefcase className="w-4 h-4 text-purple-500" />;
      case 'Offered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'Applied': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Interviewing': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Offered': return 'bg-green-50 text-green-700 border-green-100';
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Application Dashboard</h1>
          <p className="text-slate-500 mt-1">Track and manage your job applications</p>
        </div>
        <button 
          onClick={() => setShowSearchModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Search className="w-4 h-4" />
          Find Jobs
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {applications.map((app) => (
            <motion.div
              key={app.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-medium ${getStatusColor(app.status)}`}>
                  {getStatusIcon(app.status)}
                  {app.status}
                </div>
                <div className="relative group/menu">
                  <button className="p-1 hover:bg-slate-100 rounded-md transition-colors">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10">
                    {['Applied', 'Interviewing', 'Offered', 'Rejected', 'Withdrawn'].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(app.id, s as any)}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        Set to {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-1">{app.job_title}</h3>
              <p className="text-slate-600 mb-4">{app.company_name}</p>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                Applied on {new Date(app.applied_at).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {applications.length === 0 && !loading && (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No applications yet</h3>
            <p className="text-slate-500">Start your job search and track your progress here.</p>
          </div>
        )}
      </div>

      {/* Find Jobs Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Find Jobs</h2>
              <button onClick={() => setShowSearchModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 border-b border-slate-200 bg-slate-50">
              <form onSubmit={handleSearchJobs} className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by role, keyword, or company..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching || !searchQuery.trim()}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </form>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {isSearching ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((job) => (
                  <div key={job.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-colors flex justify-between items-start">
                    <div className="space-y-3 flex-1 pr-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 mt-2">
                          <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {job.company}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                          <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {job.salary}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">{job.description}</p>
                      <p className="text-xs text-slate-400">Posted: {job.postedAt}</p>
                    </div>
                    <button 
                      onClick={() => handleApplyToJob(job)}
                      className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0 whitespace-nowrap"
                    >
                      Quick Apply
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p>Search for jobs using the AI-powered search tool.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
