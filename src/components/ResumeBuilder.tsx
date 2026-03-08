import React, { useState } from 'react';
import { Download, Save, Plus, X, User as UserIcon, Briefcase as BriefcaseIcon, GraduationCap, Settings2, Bookmark, MapPin, Globe, Mail, Phone } from 'lucide-react';

export default function ResumeBuilder({ session }: any) {
  const [activeTab, setActiveTab] = useState('personal');
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Rivers');
  const [summary, setSummary] = useState('Senior Product Designer with 8+ years of experience in creating digital products that are user-centric and scalable. Specialized in design systems and SaaS platforms.');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Navbar - Inside component for consistency with screenshot */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <BriefcaseIcon className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold">Jobplex</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Find Jobs</a>
              <a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Auto-Apply Agent</a>
              <a href="#" className="text-sm font-bold text-red-500 border-b-2 border-red-500 py-5">Resume Builder</a>
              <a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">My Applications</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bookmark className="w-5 h-5 text-slate-600" />
            </button>
            <button className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
              <UserIcon className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 p-8 flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto w-full">
        
        {/* LEFT COLUMN - Form */}
        <div className="w-full lg:w-[45%] flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100 bg-white px-2">
            {[
              { id: 'personal', label: 'Personal Info' },
              { id: 'experience', label: 'Experience' },
              { id: 'education', label: 'Education' },
              { id: 'skills', label: 'Skills' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 ${activeTab === tab.id ? 'text-red-500 border-red-500' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="p-8 flex-1 overflow-y-auto space-y-10 custom-scrollbar">
            
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <h3 className="text-sm font-black flex items-center gap-2 text-slate-900 uppercase tracking-widest">
                  <UserIcon className="w-4 h-4 text-red-500" />
                  Personal Details
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">First Name</label>
                    <input 
                      type="text" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:ring-1 focus:ring-red-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Last Name</label>
                    <input 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:ring-1 focus:ring-red-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Professional Summary</label>
                  <textarea 
                    rows={4}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-1 focus:ring-red-500 outline-none resize-none leading-relaxed transition-all"
                  />
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-black flex items-center gap-2 text-slate-900 uppercase tracking-widest">
                    <BriefcaseIcon className="w-4 h-4 text-red-500" />
                    Experience
                  </h3>
                  <button className="text-[10px] font-black text-red-500 hover:text-red-600 transition-colors uppercase tracking-widest flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-lg">
                    <Plus className="w-3.5 h-3.5" /> Add New
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Experience Item 1 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-black text-slate-900">Lead UI Designer</h4>
                        <p className="text-xs font-bold text-slate-400 mt-1">Innovate Tech Solutions • 2020 - Present</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Include in PDF</span>
                        <div className="w-10 h-5 bg-red-500 rounded-full relative cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Experience Item 2 (Expanded) */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-black text-slate-900">Lead UI Designer</h4>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      Directed the end-to-end design process for the flagship mobile application, resulting in a 40% increase in user retention.
                    </p>
                  </div>

                  {/* Experience Item 3 (Disabled) */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 opacity-60">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-black text-slate-900 text-slate-400">Product Designer</h4>
                        <p className="text-xs font-bold text-slate-300 mt-1">Creative Hub Agency • 2017 - 2020</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Include in PDF</span>
                        <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-6">
                <h3 className="text-sm font-black flex items-center gap-2 text-slate-900 uppercase tracking-widest">
                  <Settings2 className="w-4 h-4 text-red-500" />
                  Skills
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  {['UI Design', 'Figma', 'React'].map((skill) => (
                    <div key={skill} className="bg-red-50 text-red-600 border border-red-100 rounded-full pl-4 pr-2 py-2 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                      {skill}
                      <button className="hover:bg-red-100 rounded-full p-1 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button className="border-2 border-dashed border-red-200 text-red-500 rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-red-50 transition-all">
                    <Plus className="w-4 h-4" /> Add Skill
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT COLUMN - Preview */}
        <div className="flex-1 bg-white border border-slate-200 rounded-[40px] p-12 relative shadow-sm flex justify-center overflow-y-auto custom-scrollbar">
          
          {/* The Document Resume */}
          <div className="w-full max-w-[700px] bg-white pt-10 pb-20 px-16 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] rounded-2xl border border-slate-50 my-4 h-fit">
            
            <div className="mb-12 text-center">
              <h1 className="text-[44px] font-black text-slate-900 tracking-tighter leading-none mb-3 uppercase">
                {firstName} {lastName}
              </h1>
              <h2 className="text-xl font-black text-red-500 tracking-widest uppercase">
                Senior Product Designer
              </h2>
              <div className="flex gap-5 justify-center items-center mt-6 text-[11px] font-bold text-slate-400">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-red-500" /> alex.rivers@example.com</span>
                <span className="text-slate-200">|</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-red-500" /> San Francisco, CA</span>
                <span className="text-slate-200">|</span>
                <span className="flex items-center gap-1.5 text-red-500"><Globe className="w-3.5 h-3.5" /> portfolio.design</span>
              </div>
            </div>

            <div className="w-full h-[1.5px] bg-red-500/10 mb-10"></div>

            <div className="space-y-12">
              {/* Summary */}
              <section>
                <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-4">Summary</h3>
                <p className="text-[15px] text-slate-600 leading-relaxed font-semibold">
                  {summary}
                </p>
              </section>

              {/* Experience */}
              <section>
                <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-6">Experience</h3>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <h4 className="text-lg font-black text-slate-900">Lead UI Designer</h4>
                      <span className="text-xs font-black text-slate-400">2020 - Present</span>
                    </div>
                    <div className="text-[11px] font-black text-slate-500 mb-4 uppercase tracking-widest">Innovate Tech Solutions</div>
                    <ul className="space-y-3">
                      {[
                        "Directed the end-to-end design process for the flagship mobile application.",
                        "Architected a comprehensive design system that reduced development time by 30%.",
                        "Mentored a team of 5 junior designers through weekly critiques."
                      ].map((bullet, i) => (
                        <li key={i} className="flex gap-3 text-[13.5px] text-slate-600 font-semibold leading-relaxed">
                          <span className="text-red-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="opacity-30 pointer-events-none">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <h4 className="text-lg font-black text-slate-900">Product Designer</h4>
                      <span className="text-xs font-black text-slate-400">2017 - 2020</span>
                    </div>
                    <div className="text-[11px] font-black text-slate-400 mb-2 uppercase tracking-widest">Creative Hub Agency</div>
                    <div className="text-[10px] font-black text-slate-400 italic">[Excluded from final version]</div>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section>
                <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-6">Education</h3>
                <div className="flex justify-between items-baseline px-4 border-l-2 border-red-50">
                  <div>
                    <h4 className="text-[15px] font-black text-slate-900">BFA in Graphic Design</h4>
                    <div className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest leading-loose">Rhode Island School of Design</div>
                  </div>
                  <span className="text-xs font-black text-slate-400">2013 - 2017</span>
                </div>
              </section>

              {/* Expertise */}
              <section>
                <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-5">Expertise</h3>
                <div className="flex flex-wrap gap-x-8 gap-y-3 px-1">
                  {['UI Design', 'Figma', 'React', 'UX Strategy'].map((skill) => (
                    <div key={skill} className="flex items-center gap-2.5 text-[13px] font-black text-slate-700">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      {skill}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Floating Actions */}
          <div className="fixed bottom-12 right-12 flex items-center gap-4 bg-white/40 backdrop-blur-xl p-3 rounded-3xl shadow-2xl border border-white/50">
            <button className="flex items-center gap-2 px-8 py-4 font-black uppercase tracking-widest text-xs text-slate-700 hover:text-slate-900 transition-all bg-white rounded-2xl shadow-lg border border-slate-100">
              <Save className="w-4 h-4 text-red-500" />
              Save to Profile
            </button>
            <button className="flex items-center gap-2 px-8 py-4 font-black uppercase tracking-widest text-xs text-slate-900 bg-amber-400 hover:bg-amber-500 transition-all rounded-2xl shadow-lg shadow-amber-400/20">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #fca5a5; }
      `}} />
    </div>
  );
}
