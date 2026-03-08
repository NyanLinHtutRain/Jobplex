import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Filter, ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  logo: string;
  postedAt: string;
}

interface LandingPageProps {
  onLoginClick: () => void;
}

export default function LandingPage({ onLoginClick }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    setHasSearched(true);
    try {
      const response = await fetch(`/api/jobs/search?q=${encodeURIComponent(searchQuery || 'Software Engineer')}`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
      alert('Failed to search jobs');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Briefcase className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">HireStream</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={onLoginClick}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={onLoginClick}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-sm"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            Find your next <span className="text-indigo-600">dream job</span> today.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 mb-10"
          >
            Browse thousands of high-quality job listings from top companies around the world.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200 flex flex-col md:flex-row gap-2"
          >
            <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-100 py-2">
              <Search className="w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Job title, keywords..." 
                className="w-full bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-4 gap-3 py-2">
              <MapPin className="w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="City, state, or remote" 
                className="w-full bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md disabled:opacity-50"
            >
              {isSearching ? 'Searching...' : 'Search Jobs'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Filters & Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                <Filter className="w-4 h-4" />
                Filters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Job Type</label>
                  <div className="space-y-2">
                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Experience Level</label>
                  <div className="space-y-2">
                    {['Entry Level', 'Mid Level', 'Senior Level', 'Director'].map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Salary Range</label>
                  <select className="w-full rounded-lg border-slate-300 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Any Salary</option>
                    <option>$50k - $80k</option>
                    <option>$80k - $120k</option>
                    <option>$120k - $160k</option>
                    <option>$160k+</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                {hasSearched ? `Found ${jobs.length} jobs` : 'Search for jobs to get started'}
              </h2>
              {jobs.length > 0 && (
                <select className="bg-transparent border-none text-sm font-medium text-slate-600 focus:ring-0 cursor-pointer">
                  <option>Most Recent</option>
                  <option>Highest Salary</option>
                  <option>Most Relevant</option>
                </select>
              )}
            </div>

            <div className="grid gap-4">
              {isSearching ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <motion.div 
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group"
                    onClick={onLoginClick}
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                        <Briefcase className="w-6 h-6 text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                            <p className="text-sm text-slate-500">{job.company} • {job.location}</p>
                          </div>
                          <button className="text-slate-300 hover:text-amber-400 transition-colors">
                            <Star className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
                            Full-time
                          </span>
                          <span className="text-sm font-medium text-slate-700">
                            {job.salary}
                          </span>
                          <span className="text-xs text-slate-400 ml-auto">
                            {job.postedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : hasSearched ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900">No jobs found</h3>
                  <p className="text-slate-500">Try adjusting your search criteria.</p>
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                  <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900">Ready to find your next role?</h3>
                  <p className="text-slate-500">Enter a job title above and click Search.</p>
                </div>
              )}
            </div>

            <button className="w-full py-4 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-2xl border-2 border-dashed border-indigo-100 transition-all mt-4">
              Load More Jobs
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <Briefcase className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">HireStream</span>
          </div>
          <p className="text-sm text-slate-400 mb-8">Connecting talent with opportunity since 2026.</p>
          <div className="flex justify-center gap-8 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
