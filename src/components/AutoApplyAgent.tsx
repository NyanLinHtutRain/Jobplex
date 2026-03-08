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
  UploadCloud,
  Loader2
} from "lucide-react";

interface Log {
  id: string;
  text: string;
  icon: React.ReactNode;
  color: string;
  time: string;
  child?: React.ReactNode;
}

export default function AutoApplyAgent() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUploadedResume, setHasUploadedResume] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const [activeJobTitles, setActiveJobTitles] = useState(["Frontend Developer", "Full Stack"]);
  const [targetLocation, setTargetLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");
  
  const [feedLogs, setFeedLogs] = useState<Log[]>([
    { id: 'init', text: "System initialized. Waiting for user to configure profile and activate agent.", icon: <Bot className="w-4 h-4 text-slate-500" />, color: "text-slate-500", time: new Date().toLocaleTimeString('en-US', {hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit'}) }
  ]);
  
  const [jobsScanned, setJobsScanned] = useState(0);
  const [jobsApplied, setJobsApplied] = useState(0);
  const [emailsSent, setEmailsSent] = useState(0);
  const feedEndRef = useRef<HTMLDivElement>(null);

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
        let newLog: any = null;
        
        switch (step) {
          case 0:
            setJobsScanned(prev => prev + Math.floor(Math.random() * 5) + 1);
            const locationText = targetLocation ? ` in ${targetLocation}` : "";
            newLog = { id: Date.now().toString() + Math.random(), text: `Scanning Job Boards${locationText}...`, icon: <RefreshCcw className="w-4 h-4 text-amber-500 animate-spin" />, color: "text-amber-500", time: now };
            break;
          case 1:
            const company = companies[currentJobCount % companies.length];
            const role = roles[currentJobCount % roles.length];
            const compatibility = Math.floor(Math.random() * 20) + 75; // 75-95%
            newLog = { 
              id: Date.now().toString() + Math.random(),
              text: `Match found: ${role} at ${company}`, 
              icon: <CheckCircle2 className="w-4 h-4 text-[#ea4334]" />, 
              color: "text-white", 
              time: now, 
              child: (
                <div className="ml-6 flex items-center gap-3 mt-1">
                  <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${compatibility}%` }} transition={{ duration: 1 }} className="bg-[#ea4334] h-full" />
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
            newLog = { id: Date.now().toString() + Math.random(), text: `Sending personalized outreach... Done. (Job ${currentJobCount + 1}/7)`, icon: <Send className="w-4 h-4 text-[#ea4334]" />, color: "text-[#ea4334]", time: now };
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
  }, [isPlaying, targetLocation]);

  const handleUpload = () => {
    if (hasUploadedResume) return;
    setIsUploading(true);
    setShowError(false);
    setTimeout(() => {
      setIsUploading(false);
      setHasUploadedResume(true);
      setFeedLogs(prev => [...prev, { id: Date.now().toString(), text: "Resume 'software_engineer_cv.pdf' parsed successfully.", icon: <FileCheck2 className="w-4 h-4 text-emerald-400" />, color: "text-emerald-400", time: new Date().toLocaleTimeString('en-US', {hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit'}) }]);
    }, 1500);
  };

  const handleActivate = () => {
    if (!hasUploadedResume) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }
    setFeedLogs(prev => [...prev, { id: Date.now().toString(), text: "Agent activated. Using candidate profile to find matches...", icon: <Zap className="w-4 h-4 text-amber-400" />, color: "text-amber-400", time: new Date().toLocaleTimeString('en-US', {hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit'}) }]);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#131f1a]">
      <main className="max-w-[1400px] mx-auto w-full p-6 lg:p-10 flex-1">
        
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black tracking-tight">Auto-Apply Agent</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-medium">Leverage AI to scan, match, and apply to roles automatically.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => hasUploadedResume ? setIsPlaying(!isPlaying) : null}
            className={`flex items-center gap-2 rounded-xl h-12 px-8 text-sm font-bold transition-all shadow-lg ${!hasUploadedResume ? 'opacity-50 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-500' : isPlaying ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700' : 'bg-[#ea4334] text-white hover:bg-red-600 shadow-red-500/20'}`}
          >
            <PauseCircle size={18} />
            <span>{isPlaying ? 'Pause Agent' : 'Resume Agent'}</span>
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Settings) */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-12 xl:col-span-5 flex flex-col gap-8">
            
            <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl">
              <h3 className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                <FileText className="text-[#ea4334]" size={16} />
                Candidate Profile
              </h3>
              
              <div 
                onClick={handleUpload}
                className={`group flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed transition-all px-6 py-10 cursor-pointer relative overflow-hidden ${hasUploadedResume ? 'border-emerald-500/30 bg-emerald-500/5' : showError ? 'border-[#ea4334] bg-[#ea4334]/10 animate-shake' : 'border-[#ea4334]/30 hover:border-[#ea4334]/60 bg-[#ea4334]/5 hover:bg-[#ea4334]/10'}`}
              >
                {!hasUploadedResume && <div className="absolute inset-0 bg-gradient-to-tr from-[#ea4334]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />}
                
                <div className="flex flex-col items-center gap-2 relative z-10 text-center">
                  <div className={`p-4 rounded-2xl shadow-sm mb-2 transition-transform duration-300 group-hover:scale-110 ${hasUploadedResume ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white dark:bg-slate-800 text-[#ea4334]'}`}>
                    {isUploading ? <Loader2 size={32} className="animate-spin" /> : hasUploadedResume ? <FileCheck2 size={32} /> : <UploadCloud size={32} />}
                  </div>
                  
                  {isUploading ? (
                    <p className="text-slate-900 dark:text-white text-xl font-black tracking-tight">Parsing PDF...</p>
                  ) : hasUploadedResume ? (
                    <>
                      <p className="text-slate-900 dark:text-white text-xl font-black tracking-tight uppercase">Upload Successful</p>
                      <p className="text-slate-400 dark:text-slate-500 text-sm font-bold">software_engineer_cv.pdf</p>
                    </>
                  ) : (
                    <>
                      <p className="text-slate-900 dark:text-white text-xl font-black tracking-tight uppercase">Upload Resume</p>
                      <p className="text-slate-400 dark:text-slate-500 text-sm font-bold">Click or drag a PDF to begin</p>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-6">
                <div>
                  <label className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] block mb-3 leading-none">Job Titles</label>
                  <div className="flex flex-wrap items-center gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 focus-within:border-[#ea4334] transition-all">
                    {activeJobTitles.map(title => (
                      <span key={title} className="flex items-center gap-1.5 px-4 py-2 bg-[#ea4334] text-white text-[11px] font-black uppercase tracking-wider rounded-xl shadow-md shadow-red-500/20">
                        {title} 
                        <X size={14} className="cursor-pointer hover:text-white/70" onClick={() => setActiveJobTitles(activeJobTitles.filter(t => t !== title))} />
                      </span>
                    ))}
                    <button className="flex items-center gap-1 text-[#ea4334] text-[11px] font-black hover:text-red-700 transition-colors ml-2 uppercase tracking-widest">
                      <Plus size={14} /> Add Title
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] block mb-3 leading-none">Locations</label>
                    <input 
                      value={targetLocation}
                      onChange={(e) => setTargetLocation(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 text-sm font-bold focus:ring-[#ea4334] focus:border-[#ea4334] placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-all outline-none" 
                      placeholder="e.g. Remote, NY" 
                      type="text" 
                      disabled={isPlaying}
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] block mb-3 leading-none">Min Salary</label>
                    <input 
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 text-sm font-bold focus:ring-[#ea4334] focus:border-[#ea4334] placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-all outline-none" 
                      placeholder="$120k/yr" 
                      type="text" 
                      disabled={isPlaying}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest mb-6">Job Sources</h3>
              <div className="grid grid-cols-2 gap-4">
                {['LinkedIn', 'JobStreet', 'Indeed', 'Career Pages'].map((source, i) => (
                  <label key={source} className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 transition-all rounded-2xl border border-slate-100 dark:border-slate-700 cursor-pointer shadow-sm hover:shadow-md hover:border-[#ea4334]/30">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white">{source}</span>
                    <input defaultChecked={i !== 2} className="text-[#ea4334] rounded-[6px] h-5 w-5 border-slate-200 dark:border-slate-600 focus:ring-[#ea4334] bg-white cursor-pointer transition-all" type="checkbox" />
                  </label>
                ))}
              </div>
            </section>

            <motion.button 
              whileHover={!isPlaying && { scale: 1.02 }}
              whileTap={!isPlaying && { scale: 0.98 }}
              onClick={handleActivate}
              disabled={isPlaying}
              className={`w-full font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all relative overflow-hidden group shadow-2xl ${isPlaying ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' : showError ? 'bg-[#ea4334] text-white animate-shake' : 'bg-[#ea4334] text-white shadow-red-500/40 hover:bg-red-600'}`}
            >
              <Zap className={isPlaying ? "fill-slate-600 text-slate-600" : "fill-white text-white animate-pulse"} size={20} />
              <span className="tracking-[0.1em] text-sm uppercase">{isPlaying ? "AGENT ACTIVE" : showError ? "UPLOAD RESUME FIRST" : "ACTIVATE AGENT"}</span>
            </motion.button>
          </motion.div>

          {/* Right Column (Metrics & Terminal) */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-12 xl:col-span-7 flex flex-col gap-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: "Jobs Scanned", val: jobsScanned.toLocaleString(), sub: "+12%", accent: "bg-blue-500" },
                { title: "Auto-Applied", val: jobsApplied.toLocaleString(), sub: "Active", accent: "bg-[#ea4334]" },
                { title: "Emails Sent", val: emailsSent.toLocaleString(), sub: "Status: Live", accent: "bg-emerald-500" }
              ].map((metric, i) => (
                <motion.div whileHover={{ y: -4 }} key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                   <div className={`absolute top-0 right-0 w-16 h-16 ${metric.accent} opacity-[0.03] rounded-bl-full transition-all group-hover:scale-150 group-hover:opacity-[0.06]`} />
                  <p className="text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-3">{metric.title}</p>
                  <div className="flex flex-col gap-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">{metric.val}</span>
                    <span className="text-[10px] font-black text-[#ea4334] uppercase tracking-widest">{metric.sub}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-[#0f172a] rounded-[32px] overflow-hidden flex flex-col h-full min-h-[600px] border border-slate-800 shadow-2xl relative">
              <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex gap-2.5">
                  <div className="size-3 rounded-full bg-red-500/40 hover:bg-red-500 transition-colors cursor-pointer" />
                  <div className="size-3 rounded-full bg-amber-500/40 hover:bg-amber-500 transition-colors cursor-pointer" />
                  <div className="size-3 rounded-full bg-emerald-500/40 hover:bg-emerald-500 transition-colors cursor-pointer" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    {isPlaying && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Agent Live Feed</span>
                </div>
                <Settings size={14} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
              </div>

              <div className="p-8 font-mono text-[13px] space-y-6 overflow-y-auto flex-1 custom-scrollbar scroll-smooth">
                {feedLogs.map((log, idx) => (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} key={log.id || idx} className="flex items-start gap-4 group">
                    <span className="text-slate-700 shrink-0 select-none font-bold">[{log.time}]</span>
                    <div className="flex flex-col gap-2 w-full">
                      <div className={`flex items-start gap-3 ${log.color}`}>
                        <div className="mt-0.5 shrink-0 opacity-80">{log.icon}</div>
                        <span className="leading-relaxed font-medium">{log.text}</span>
                      </div>
                      {log.child}
                    </div>
                  </motion.div>
                ))}
                <div ref={feedEndRef} />
              </div>

              <div className="mt-auto border-t border-slate-800 bg-slate-900/60 px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[#ea4334] font-black text-lg select-none">›</span>
                  <span className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">{isPlaying ? 'Processing Live Streams...' : 'Agent Standby'}</span>
                </div>
                {isPlaying && <div className="w-2.5 h-5 bg-[#ea4334]/80 animate-pulse rounded-sm shadow-[0_0_12px_rgba(234,67,52,0.4)]" />}
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both; }
      `}} />
    </div>
  );
}
