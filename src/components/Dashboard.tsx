import React, { useState } from 'react';
import { Search, Bell, User as UserIcon, MoreHorizontal, Calendar, Briefcase, Plus, Bookmark } from 'lucide-react';

interface Application {
  id: string;
  company: string;
  role: string;
  dateStr: string;
  status: 'Saved' | 'Applied' | 'Interview' | 'Offer';
  logoLetter: string;
  colorClass: string;
  tag?: string;
  tagColor?: string;
  interviewDate?: string;
}

const APPLICATIONS: Application[] = [
  {
    id: '1', company: 'Google', role: 'Senior UX Researcher', dateStr: 'Saved Oct 20', status: 'Saved',
    logoLetter: 'G', colorClass: 'bg-slate-100 text-slate-600', tag: 'SAVED', tagColor: 'bg-blue-50 text-blue-500'
  },
  {
    id: '2', company: 'Notion', role: 'Product Designer', dateStr: 'Saved Oct 27', status: 'Saved',
    logoLetter: 'N', colorClass: 'bg-slate-100 text-slate-600', tag: 'SAVED', tagColor: 'bg-blue-50 text-blue-500'
  },
  {
    id: '3', company: 'Apple', role: 'Software Engineer', dateStr: 'Saved Oct 28', status: 'Saved',
    logoLetter: 'A', colorClass: 'bg-slate-100 text-slate-600', tag: 'SAVED', tagColor: 'bg-blue-50 text-blue-500'
  },
  {
    id: '4', company: 'Stripe', role: 'Product Designer', dateStr: 'Applied Oct 24', status: 'Applied',
    logoLetter: 'S', colorClass: 'bg-red-50 text-red-500', tag: 'APPLIED', tagColor: 'bg-red-50 text-red-500'
  },
  {
    id: '5', company: 'Figma', role: 'UI Engineer', dateStr: 'Applied Oct 22', status: 'Applied',
    logoLetter: 'F', colorClass: 'bg-orange-50 text-orange-500', tag: 'APPLIED', tagColor: 'bg-red-50 text-red-500'
  },
  {
    id: '6', company: 'Spotify', role: 'Senior Product Designer', dateStr: 'Applied Oct 25', status: 'Applied',
    logoLetter: 'S', colorClass: 'bg-green-50 text-green-600', tag: 'APPLIED', tagColor: 'bg-red-50 text-red-500'
  },
  {
    id: '7', company: 'Airbnb', role: 'UX Engineer', dateStr: 'Applied Oct 20', status: 'Interview',
    logoLetter: 'A', colorClass: 'bg-amber-50 text-amber-500', tag: 'ROUND 2', tagColor: 'bg-amber-50 text-amber-500',
    interviewDate: 'Interview: Tomorrow, 10:00 AM'
  },
  {
    id: '8', company: 'Netflix', role: 'Data Analyst', dateStr: 'Applied Oct 18', status: 'Interview',
    logoLetter: 'N', colorClass: 'bg-red-50 text-red-600', tag: 'ROUND 1', tagColor: 'bg-amber-50 text-amber-500',
    interviewDate: 'Interview: Thursday, 2:00 PM'
  },
  {
    id: '9', company: 'Vercel', role: 'Frontend Developer', dateStr: 'Applied Oct 15', status: 'Offer',
    logoLetter: 'V', colorClass: 'bg-emerald-50 text-emerald-500', tag: 'DECISION', tagColor: 'bg-emerald-50 text-emerald-500'
  },
  {
    id: '10', company: 'Meta', role: 'Product Manager', dateStr: 'Applied Oct 10', status: 'Offer',
    logoLetter: 'M', colorClass: 'bg-blue-50 text-blue-600', tag: 'ACCEPTED', tagColor: 'bg-emerald-50 text-emerald-500'
  }
];

const COLUMNS = [
  { id: 'Saved', title: 'Saved', lineClass: 'bg-slate-200', countClass: 'bg-slate-100 text-slate-600' },
  { id: 'Applied', title: 'Applied', lineClass: 'bg-red-500', countClass: 'bg-red-50 text-red-500' },
  { id: 'Interview', title: 'Interview', lineClass: 'bg-amber-400', countClass: 'bg-amber-50 text-amber-500' },
  { id: 'Offer', title: 'Offer', lineClass: 'bg-emerald-400', countClass: 'bg-emerald-50 text-emerald-500' }
];

export default function Dashboard({ session }: any) {
  const [applications, setApplications] = useState<Application[]>(APPLICATIONS);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <div className="max-w-[1600px] mx-auto px-8 pt-10 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Application Status Tracker</h1>
          <p className="text-slate-400 font-bold mt-1 uppercase text-[10px] tracking-[0.2em]">Manage your hiring pipeline</p>
        </div>
        <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-4 py-2 hover:shadow-sm transition-all shadow-sm">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search applications..." 
            className="bg-transparent outline-none text-sm font-bold placeholder:text-slate-300 w-48"
          />
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-8 py-8 h-[calc(100vh-190px)] overflow-x-auto custom-scrollbar">
        <div className="flex gap-8 h-full min-w-max pb-4">
          {COLUMNS.map((column) => {
            const columnApps = applications.filter(app => app.status === column.id);
            return (
              <div key={column.id} className="w-[340px] flex flex-col shrink-0">
                <div className="flex justify-between items-center mb-6 px-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">{column.title}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${column.countClass}`}>
                      {columnApps.length}
                    </span>
                  </div>
                  <button className="text-slate-300 hover:text-slate-600 transition-colors p-1">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                <div className={`w-full h-[3px] rounded-full mb-6 ${column.lineClass} shadow-sm shadow-black/10`}></div>

                <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar pb-20 cursor-default">
                  {columnApps.map(app => (
                    <div key={app.id} className="bg-white rounded-[24px] p-6 shadow-[0_4px_12px_-6px_rgba(0,0,0,0.06)] border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex justify-between items-start mb-5">
                        <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center font-black text-xl shadow-sm border border-slate-50 ${app.colorClass}`}>
                          {app.logoLetter}
                        </div>
                        {app.tag && (
                          <div className={`px-3 py-1 rounded-[8px] text-[9.5px] font-black tracking-[0.1em] uppercase ${app.tagColor}`}>
                            {app.tag}
                          </div>
                        )}
                      </div>
                      
                      <h3 className="font-black text-[16px] text-slate-900 mb-0.5 group-hover:text-red-500 transition-colors uppercase tracking-tight">{app.company}</h3>
                      <p className="text-[13px] font-bold text-slate-400 mb-6">{app.role}</p>

                      <div className="flex flex-col gap-3 border-t border-slate-50 pt-5">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-300">
                          <ClockIcon className="w-3.5 h-3.5" />
                          <span className="uppercase tracking-widest">{app.dateStr}</span>
                        </div>
                        {app.interviewDate && (
                          <div className="flex items-center gap-2 text-[11px] font-bold text-amber-500 bg-amber-50/50 px-3 py-1.5 rounded-lg w-full mt-1 border border-amber-100/50">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="leading-none">{app.interviewDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {columnApps.length === 0 && (
                    <div className="h-28 border-2 border-dashed border-slate-200 rounded-[24px] flex flex-col items-center justify-center bg-slate-50/30 gap-2">
                       <Plus className="w-5 h-5 text-slate-200" />
                       <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Drop here</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Circular RED Plus Button */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full shadow-2xl shadow-red-500/40 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90 z-50 group border-4 border-white/20">
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #fca5a5; }
      `}} />
    </div>
  );
}

function ClockIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
