import React, { useState } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Bell, User, LayoutGrid, Globe, Bookmark, ExternalLink, ChevronDown } from 'lucide-react';

export default function LandingPage({ onLoginClick }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  const jobs = [
    {
      id: '1',
      title: 'Senior Product Designer',
      company: 'Spotify',
      location: 'Stockholm, Sweden',
      time: '2h ago',
      type: 'Full-time',
      isRemote: true,
      salary: '$120k - $160k',
      icon: '🎵',
      iconBg: 'bg-red-50',
      iconText: 'text-red-500'
    },
    {
      id: '2',
      title: 'Frontend Developer (React)',
      company: 'Airbnb',
      location: 'San Francisco, CA',
      time: '5h ago',
      type: 'Contract',
      isRemote: false,
      isHybrid: true,
      salary: '$140k - $180k',
      icon: '🏠',
      iconBg: 'bg-red-50',
      iconText: 'text-red-500'
    },
    {
      id: '3',
      title: 'Cloud Infrastructure Engineer',
      company: 'Stripe',
      location: 'Remote',
      time: '1d ago',
      type: 'Full-time',
      isRemote: true,
      salary: '$160k - $210k',
      icon: '☁️',
      iconBg: 'bg-red-50',
      iconText: 'text-red-500'
    },
    {
      id: '4',
      title: 'Data Analyst',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      time: '2d ago',
      type: 'Full-time',
      isRemote: false,
      isOnsite: true,
      salary: '$130k - $170k',
      icon: '📊',
      iconBg: 'bg-red-50',
      iconText: 'text-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onLoginClick()}>
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <Briefcase className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold">Jobplex</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-bold text-red-500 border-b-2 border-red-500 pb-5 mt-5">Find Jobs</a>
              <a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Auto-Apply Agent</a>
              <a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Resume Builder</a>
              <a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">My Applications</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <button className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
              <User className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3 shadow-sm focus-within:ring-2 focus-within:ring-red-100 transition-all">
            <Search className="w-5 h-5 text-red-500" />
            <input 
              type="text" 
              placeholder="Search job titles, keywords, or companies" 
              className="flex-1 outline-none text-sm font-medium bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: MapPin, label: 'Location' },
              { icon: Briefcase, label: 'Job Type' },
              { icon: DollarSign, label: 'Salary' }
            ].map((filter, i) => (
              <button key={i} className="bg-white border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-bold text-slate-700 hover:border-slate-300 transition-all shadow-sm">
                <filter.icon className="w-4 h-4 text-red-500" />
                {filter.label}
                <ChevronDown className="w-4 h-4 text-slate-400 ml-2" />
              </button>
            ))}
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20">
              Search
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          {/* Left Column: Job List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">RECOMMENDED JOBS (128)</h2>
              <button className="text-xs font-bold text-red-500 flex items-center gap-1">
                Sort by: <span className="text-red-500">Newest</span>
              </button>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-320px)] overflow-y-auto pr-2 custom-scrollbar">
              {jobs.map((job) => (
                <div 
                  key={job.id} 
                  className={`bg-white border rounded-2xl p-6 cursor-pointer transition-all hover:shadow-md ${job.id === '1' ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm border border-slate-100 ${job.iconBg}`}>
                      {job.icon}
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">{job.time}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-1">{job.title}</h3>
                  <p className="text-sm font-medium text-slate-500 mb-4">{job.company} • {job.location}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-bold rounded-full uppercase tracking-wider">{job.type}</span>
                    {job.isRemote && <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">Remote</span>}
                    {job.isHybrid && <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">Hybrid</span>}
                    {job.isOnsite && <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">On-site</span>}
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">{job.salary}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Job Details */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm h-fit sticky top-28 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
            <div className="flex justify-between items-start mb-8">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100">
                  🎵
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 mb-1">Senior Product Designer</h1>
                  <p className="text-slate-500 font-bold flex items-center gap-2">
                    Spotify <span className="text-slate-300">•</span> Stockholm, Sweden <span className="text-slate-300">•</span> <span className="text-red-500">Remote Friendly</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors">
                  <Bookmark className="w-5 h-5 text-slate-600" />
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-500/20">
                  Apply Now <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { label: 'SALARY RANGE', value: '$120k - $160k' },
                { label: 'EXPERIENCE', value: '5+ Years' },
                { label: 'EDUCATION', value: "Bachelor's Degree" }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
                  <p className="font-black text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-10">
              <section>
                <h3 className="text-lg font-black text-slate-900 mb-4">Job Description</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  We're looking for an experienced Senior Product Designer to join our Core Experience team at Spotify. You'll be responsible for creating intuitive, delightful, and human-centric experiences for millions of music fans worldwide. You'll work closely with engineers, product managers, and researchers to evolve the Spotify app across platforms.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-black text-slate-900 mb-6">What you'll do</h3>
                <div className="space-y-4">
                  {[
                    "Drive the product design process from initial concept through research, prototyping, and final implementation.",
                    "Collaborate with cross-functional partners to define strategy and roadmap for core music features.",
                    "Maintain and evolve our design system, ensuring consistency and accessibility across all touchpoints.",
                    "Mentor junior designers and contribute to our thriving design culture."
                  ].map((text, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      </div>
                      <p className="text-slate-600 font-medium text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-black text-slate-900 mb-6">Requirements</h3>
                <div className="space-y-4 pl-4">
                  {[
                    "5+ years of experience in product design, preferably in consumer-facing mobile apps.",
                    "A strong portfolio showcasing end-to-end design thinking and high-fidelity visual execution.",
                    "Proficiency in Figma and interactive prototyping tools."
                  ].map((text, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="text-red-500 font-black">→</span>
                      <p className="text-slate-600 font-medium text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-red-50/30 p-8 rounded-3xl border border-red-50">
                <h3 className="text-lg font-black text-slate-900 mb-6">About Spotify</h3>
                <div className="flex gap-8">
                  <div className="w-32 h-20 bg-slate-900 rounded-xl flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                    <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200" alt="Spotify" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Our mission is to unlock the potential of human creativity—by giving a million creative artists the opportunity to live off their art and billions of fans the opportunity to enjoy and be inspired by it. Spotify transformed music listening forever when we launched in 2008. Our team is global and we embrace the flexibility of working from anywhere.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #fca5a5; }
      `}} />
    </div>
  );
}
