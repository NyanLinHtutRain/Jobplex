import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  Bell, 
  PauseCircle, 
  FileText, 
  FileCheck2, 
  X, 
  Plus, 
  Zap, 
  Settings,
  RefreshCcw,
  CheckCircle2,
  Rocket,
  Mail,
  Send,
  MoreHorizontal
} from "lucide-react";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeJobTitles, setActiveJobTitles] = useState(["Frontend Developer", "Full Stack"]);
  const [feedLogs, setFeedLogs] = useState([]);
  const [jobsScanned, setJobsScanned] = useState(1284);
  const [jobsApplied, setJobsApplied] = useState(42);
  const [emailsSent, setEmailsSent] = useState(18);
  const feedEndRef = useRef(null);

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [feedLogs]);

  // Mock animation loop for the feed
  useEffect(() => {
    if (!isPlaying) return;

    const companies = ["Acme Corp", "Tech Solutions Inc", "Global Data Systems", "Innovatech", "Cloudify", "NexGen Software", "Pied Piper"];
    const roles = ["React Developer", "Frontend Engineer", "Full Stack Developer", "Software Engineer", "UI Engineer", "Frontend Developer", "Web Developer"];
    
    let currentJobCount = 0;
    let step = 0;
    
    const interval = setInterval(() => {
      setFeedLogs(prev => {
        if (currentJobCount >= 7) {
            const hasCompleteLog = prev.some(log => log.id === 'complete');
            if (!hasCompleteLog) {
                return [...prev, { id: 'complete', text: "Session complete: Successfully applied to targeted 7 jobs limit.", icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, color: "text-emerald-400", time: new Date().toLocaleTimeString('en-US', {hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit'}) }];
            }
            return prev;
        }

        const now = new Date().toLocaleTimeString('en-US', {hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit'});
        let newLog = null;
        
        switch (step) {
          case 0:
            setJobsScanned(prev => prev + Math.floor(Math.random() * 5) + 1);
            newLog = { id: Date.now().toString() + Math.random(), text: "Scanning Job Boards...", icon: <RefreshCcw className="w-4 h-4 text-secondary animate-spin" />, color: "text-secondary", time: now };
            break;
          case 1:
            const company = companies[currentJobCount % companies.length];
            const role = roles[currentJobCount % roles.length];
            const compatibility = Math.floor(Math.random() * 20) + 75; // 75-95%
            newLog = { 
              id: Date.now().toString() + Math.random(),
              text: `Match found: ${role} at ${company}`, 
              icon: <CheckCircle2 className="w-4 h-4 text-primary" />, 
              color: "text-white", 
              time: now, 
              child: (
                <div className="ml-6 flex items-center gap-3 mt-1">
                  <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${compatibility}%` }} transition={{ duration: 1 }} className="bg-primary h-full" />
                  </div>
                  <span className="text-xs text-slate-400 font-sans">{compatibility}% Compatibility</span>
                </div>
              ) 
            };
            break;
          case 2:
            newLog = { id: Date.now().toString() + Math.random(), text: "Auto-applying via internal API...", icon: <Rocket className="w-4 h-4 text-slate-300" />, color: "text-slate-300", time: now };
            setJobsApplied(prev => prev + 1);
            break;
          case 3:
            const domain = companies[currentJobCount % companies.length].replace(/\s+/g, '').toLowerCase();
            newLog = { id: Date.now().toString() + Math.random(), text: `HR Email found: careers@${domain}.com`, icon: <Mail className="w-4 h-4 text-blue-400" />, color: "text-blue-400", time: now };
            break;
          case 4:
            newLog = { id: Date.now().toString() + Math.random(), text: `Sending personalized outreach... Done. (Job ${currentJobCount + 1}/7)`, icon: <Send className="w-4 h-4 text-primary" />, color: "text-primary", time: now };
            setEmailsSent(prev => prev + 1);
            break;
        }

        step++;
        if (step > 4) {
          step = 0;
          currentJobCount++;
        }
        
        const nextLogs = newLog ? [...prev, newLog] : prev;
        return nextLogs.slice(-50);
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex h-full grow flex-col">
      {/* Top Navigation */}
      <header className="flex items-center justify-between border-b border-primary/10 bg-white dark:bg-slate-900 px-6 py-3 lg:px-20 z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="text-primary bg-primary/10 p-2 rounded-xl">
            <Bot size={24} className="stroke-[2.5]" />
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Jobplex</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <nav className="hidden md:flex items-center gap-8">
            {["Find Jobs", "Auto-Apply Agent", "Resume Builder", "My Applications"].map((item, idx) => (
              <a 
                key={item} 
                className={`text-sm font-medium transition-colors ${idx === 1 ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`} 
                href="#"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button className="rounded-full hover:bg-primary/20 bg-primary/10 p-2.5 text-primary transition-colors cursor-pointer">
              <Bell size={18} className="stroke-[2.5]" />
            </button>
            <div className="bg-slate-200 dark:bg-slate-700 rounded-full size-10 flex items-center justify-center overflow-hidden border border-primary/20 cursor-pointer hover:border-primary transition-colors">
              <img className="w-full h-full object-cover" alt="User Profile" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto w-full p-6 lg:p-10 flex-1">
        
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black tracking-tight">Auto-Apply Agent</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base">Leverage AI to scan, match, and apply to roles automatically.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 rounded-lg h-11 px-6 text-sm font-bold transition-all shadow-sm ${isPlaying ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700' : 'bg-primary text-white hover:bg-red-600'}`}
          >
            <PauseCircle size={18} />
            <span>{isPlaying ? 'Pause Agent' : 'Resume Agent'}</span>
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Settings) */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-5 flex flex-col gap-8">
            
            <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                <FileText className="text-primary" size={20} />
                Candidate Profile
              </h3>
              
              <div className="group flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/60 bg-primary/5 hover:bg-primary/10 transition-colors px-6 py-8 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col items-center gap-2 relative z-10">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm mb-2 text-primary">
                    <FileCheck2 size={28} />
                  </div>
                  <p className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Successfully Uploaded</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">resume_senior_dev.pdf</p>
                </div>
                <button className="text-primary text-sm font-bold hover:underline relative z-10">Change File</button>
              </div>

              <div className="mt-6 flex flex-col gap-5">
                <div>
                  <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold block mb-2">Job Titles</label>
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                    {activeJobTitles.map(title => (
                      <span key={title} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-full shadow-sm">
                        {title} 
                        <X size={14} className="cursor-pointer hover:text-white/70" onClick={() => setActiveJobTitles(activeJobTitles.filter(t => t !== title))} />
                      </span>
                    ))}
                    <button className="flex items-center gap-1 text-primary text-xs font-bold hover:text-red-700 transition-colors ml-1 uppercase tracking-wide">
                      <Plus size={14} /> Add Tag
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold block mb-2">Target Locations</label>
                    <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-primary focus:border-primary placeholder:text-slate-400 shadow-sm" placeholder="e.g. Remote, NY" type="text" />
                  </div>
                  <div>
                    <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold block mb-2">Min Salary</label>
                    <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-primary focus:border-primary placeholder:text-slate-400 shadow-sm" placeholder="$120k/yr" type="text" />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-slate-900 dark:text-white font-bold mb-4">Job Sources</h3>
              <div className="grid grid-cols-2 gap-3">
                {['LinkedIn', 'JobStreet', 'Indeed', 'Career Pages'].map((source, i) => (
                  <label key={source} className="group flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 transition-colors rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">{source}</span>
                    <input defaultChecked={i !== 2} className="text-primary rounded h-5 w-5 border-slate-300 dark:border-slate-600 focus:ring-primary bg-white dark:bg-slate-900 focus:ring-offset-0 cursor-pointer transition-all" type="checkbox" />
                  </label>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-slate-900 dark:text-white font-bold mb-4">Outreach Automation</h3>
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input className="text-primary rounded h-5 w-5 border-slate-300 dark:border-slate-600 focus:ring-primary bg-white dark:bg-slate-900 cursor-pointer transition-all" type="checkbox" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Auto-send cold email to HR</span>
                  </label>
                  <a className="text-primary text-xs font-bold hover:underline" href="#">Preview Template</a>
                </div>
              </div>
            </section>

            <motion.button 
              whileHover={{ scale: 1.01, backgroundColor: "#dc2626" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary font-black py-4 rounded-xl flex items-center justify-center gap-3 shadow-[0_8px_30px_rgb(234,67,52,0.3)] transition-all text-white overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Zap className="fill-white relative z-10 animate-pulse" size={20} />
              <span className="relative z-10 tracking-wide text-sm md:text-base">ACTIVATE AGENT</span>
            </motion.button>
          </motion.div>

          {/* Right Column (Metrics & Terminal) */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-7 flex flex-col gap-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Jobs Scanned", val: jobsScanned.toLocaleString(), sub: "+12%", subColor: "text-primary" },
                { title: "Auto-Applied", val: jobsApplied.toLocaleString(), sub: "Active", subColor: "text-primary", border: true },
                { title: "Emails Sent", val: emailsSent.toLocaleString(), sub: "Pending", subColor: "text-secondary" }
              ].map((metric, i) => (
                <motion.div whileHover={{ y: -2 }} key={i} className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md ${metric.border ? 'border-l-[6px] border-l-primary' : ''}`}>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{metric.title}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{metric.val}</span>
                    <span className={`${metric.subColor} text-xs font-bold`}>{metric.sub}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-[#0f172a] rounded-2xl overflow-hidden flex flex-col h-full min-h-[500px] border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
              
              <div className="bg-slate-900/50 px-4 py-3 border-b border-slate-800 flex items-center justify-between backdrop-blur-md">
                <div className="flex gap-2">
                  <div className="size-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)] cursor-pointer hover:bg-red-400" />
                  <div className="size-3 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)] cursor-pointer hover:bg-amber-400" />
                  <div className="size-3 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.5)] cursor-pointer hover:bg-emerald-400" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2 mr-1">
                    {isPlaying && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold text-center flex-1">Agent Live Feed</span>
                </div>
                <Settings size={14} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
              </div>

              <div className="p-6 font-mono text-sm space-y-5 overflow-y-auto flex-1 custom-scrollbar">
                {feedLogs.map((log, idx) => (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={log.id || idx} className="flex items-start gap-4">
                    <span className="text-slate-500 shrink-0 select-none">[{log.time}]</span>
                    <div className="flex flex-col gap-1 w-full">
                      <div className={`flex items-start gap-2.5 ${log.color}`}>
                        <div className="mt-0.5">{log.icon}</div>
                        <span className="leading-relaxed">{log.text}</span>
                      </div>
                      {log.child}
                    </div>
                  </motion.div>
                ))}
                <div ref={feedEndRef} />
              </div>

              <div className="mt-auto border-t border-slate-800 bg-slate-900/40 p-5 flex items-center gap-3">
                <span className="text-primary font-bold">{'>'}</span>
                <span className="text-slate-500 text-sm italic">{isPlaying ? 'Waiting for new data stream...' : 'Agent explicitly paused.'}</span>
                {isPlaying && <div className="w-2.5 h-5 bg-primary/70 animate-pulse ml-1 rounded-sm shadow-[0_0_8px_rgba(234,67,52,0.6)]" />}
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
