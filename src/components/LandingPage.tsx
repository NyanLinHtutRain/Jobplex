import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Bell, User, Globe, Bookmark, ExternalLink, ChevronDown, Loader2 } from 'lucide-react';

export default function LandingPage({ onLoginClick }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const initialJobs = [
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
      description: "We're looking for an experienced Senior Product Designer to join our Core Experience team at Spotify. You'll be responsible for creating intuitive, delightful, and human-centric experiences for millions of music fans worldwide. You'll work closely with engineers, product managers, and researchers to evolve the Spotify app across platforms.",
      whatYouDo: [
        "Drive the product design process from initial concept through research, prototyping, and final implementation.",
        "Collaborate with cross-functional partners to define strategy and roadmap for core music features.",
        "Maintain and evolve our design system, ensuring consistency and accessibility across all touchpoints.",
        "Mentor junior designers and contribute to our thriving design culture."
      ],
      requirements: [
        "5+ years of experience in product design, preferably in consumer-facing mobile apps.",
        "A strong portfolio showcasing end-to-end design thinking and high-fidelity visual execution.",
        "Proficiency in Figma and interactive prototyping tools."
      ]
    },
    {
      id: '2',
      title: 'Frontend Developer (React)',
      company: 'Airbnb',
      location: 'San Francisco, CA',
      time: '5h ago',
      type: 'Contract',
      isHybrid: true,
      salary: '$140k - $180k',
      icon: '🏠',
      iconBg: 'bg-red-50',
      description: "Join the Airbnb team to build the future of travel. We are looking for a React expert to help us craft seamless user interfaces.",
      whatYouDo: ["Build reusable components", "Optimize for performance", "Work with UI/UX designers"],
      requirements: ["3+ years React experience", "TypeScript proficiency", "CSS-in-JS knowledge"]
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
      description: "Scaling the world's economy requires robust infrastructure. Help us build the next generation of cloud services.",
      whatYouDo: ["Manage AWS/GCP clusters", "Automate deployments", "Ensure 99.99% uptime"],
      requirements: ["Kubernetes expert", "Terraform experience", "Strong networking background"]
    },
    {
      id: '4',
      title: 'Data Analyst',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      time: '2d ago',
      type: 'Full-time',
      isOnsite: true,
      salary: '$130k - $170k',
      icon: '📊',
      iconBg: 'bg-red-50',
      description: "Help us understand what our viewers love. Analyze data to drive content decisions for millions of users.",
      whatYouDo: ["SQL analysis", "Create dashboards", "Present findings to stakeholders"],
      requirements: ["Strong SQL skills", "Python/R experience", "Statistical background"]
    }
  ];

  const [jobs, setJobs] = useState(initialJobs);

  useEffect(() => {
    if (!selectedJob) setSelectedJob(initialJobs[0]);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(`/api/jobs/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      
      // Map AI results to our UI structure
      const mappedJobs = data.map((j: any) => ({
        id: j.id || Math.random().toString(),
        title: j.title,
        company: j.company,
        location: j.location,
        time: j.postedAt || 'Just now',
        type: 'Full-time',
        isRemote: j.location.toLowerCase().includes('remote'),
        salary: j.salary || '$100k+',
        icon: '�',
        iconBg: 'bg-red-50',
        description: j.description || 'No description provided.',
        whatYouDo: ["Contribute to core features", "Collaborate with team", "Deliver high quality code"],
        requirements: ["Proficiency in relevant technologies", "Good communication skills", "Problem solving mindset"]
      }));

      setJobs(mappedJobs);
      if (mappedJobs.length > 0) setSelectedJob(mappedJobs[0]);
    } catch (error) {
      console.error("Error searching jobs:", error);
      alert("Failed to fetch jobs. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

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
              <a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors" onClick={() => onLoginClick()}>My Applications</a>
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
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20 disabled:opacity-50 flex items-center gap-2"
            >
              {isSearching && <Loader2 className="w-4 h-4 animate-spin" />}
              Search
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          {/* Left Column: Job List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">RECOMMENDED JOBS ({jobs.length})</h2>
              <button className="text-xs font-bold text-red-500 flex items-center gap-1">
                Sort by: <span className="text-red-500">Newest</span>
              </button>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-320px)] overflow-y-auto pr-2 custom-scrollbar">
              {jobs.map((job) => (
                <div 
                  key={job.id} 
                  onClick={() => setSelectedJob(job)}
                  className={`bg-white border rounded-2xl p-6 cursor-pointer transition-all hover:shadow-md ${selectedJob?.id === job.id ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
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
              {jobs.length === 0 && !isSearching && (
                <div className="text-center py-10 text-slate-400">
                  <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p className="text-sm font-medium">No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Job Details */}
          {selectedJob && (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm h-fit sticky top-28 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100">
                    {selectedJob.icon}
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-1">{selectedJob.title}</h1>
                    <p className="text-slate-500 font-bold flex items-center gap-2">
                      {selectedJob.company} <span className="text-slate-300">•</span> {selectedJob.location} <span className="text-slate-300">•</span> <span className="text-red-500">{selectedJob.isRemote ? 'Remote Friendly' : 'On-site'}</span>
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
                  { label: 'SALARY RANGE', value: selectedJob.salary },
                  { label: 'EXPERIENCE', value: '3-5+ Years' },
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
                    {selectedJob.description}
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-black text-slate-900 mb-6">What you'll do</h3>
                  <div className="space-y-4">
                    {(selectedJob.whatYouDo || []).map((text: string, i: number) => (
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
                    {(selectedJob.requirements || []).map((text: string, i: number) => (
                      <div key={i} className="flex gap-4 items-start">
                        <span className="text-red-500 font-black">→</span>
                        <p className="text-slate-600 font-medium text-sm leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-red-50/30 p-8 rounded-3xl border border-red-50">
                  <h3 className="text-lg font-black text-slate-900 mb-6">About {selectedJob.company}</h3>
                  <div className="flex gap-8">
                    <div className="w-32 h-20 bg-slate-900 rounded-xl flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                      <div className="text-2xl">{selectedJob.icon}</div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      At {selectedJob.company}, we are dedicated to excellence and innovation. Our mission is to transform the industry through cutting-edge technology and human-centric design. We provide a collaborative environment where you can grow and make a real impact.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          )}
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
