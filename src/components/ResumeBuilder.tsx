import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Save, Wand2, FileDown, Plus, Trash2, CheckSquare, Square } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  included: boolean;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  included: boolean;
}

interface ResumeBuilderProps {
  session: any;
}

export default function ResumeBuilder({ session }: ResumeBuilderProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [summary, setSummary] = useState('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    // Load existing profile details or latest resume if available
    const loadProfile = async () => {
      if (!session?.user?.id) return;
      try {
        const { data } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(1);
          
        if (data && data.length > 0) {
          const details = data[0].details;
          setName(details.name || '');
          setEmail(details.email || '');
          setPhone(details.phone || '');
          setSummary(details.summary || '');
          setSkills((details.skills || []).join(', '));
          
          if (details.experience) {
            setExperiences(details.experience.map((e: any) => ({ ...e, id: crypto.randomUUID(), included: true })));
          }
          if (details.education) {
            setEducation(details.education.map((e: any) => ({ ...e, id: crypto.randomUUID(), included: true })));
          }
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    loadProfile();
  }, [session]);

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const getIncludedDetails = () => {
    return {
      name,
      email,
      phone,
      summary,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      experience: experiences.filter(e => e.included).map(({ id, included, ...rest }) => rest),
      education: education.filter(e => e.included).map(({ id, included, ...rest }) => rest),
    };
  };

  const handleSaveToSupabase = async () => {
    setLoading(true);
    try {
      const details = getIncludedDetails();
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: session.user.id,
          title: `Resume - ${new Date().toLocaleDateString()}`,
          details
        }),
      });
      
      if (!response.ok) throw new Error("Failed to save resume");
      
      showMessage("Resume saved to database successfully!", "success");
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleTailorWithGemini = async () => {
    if (!jobDescription) {
      showMessage("Please paste a job description first.", "error");
      return;
    }
    setLoading(true);
    try {
      const details = getIncludedDetails();
      const response = await fetch('/api/resumes/tailor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeDetails: details,
          jobDescription
        }),
      });

      if (!response.ok) throw new Error("Failed to tailor resume");
      
      const tailored = await response.json();
      
      // Update local state with tailored response
      if (tailored.summary) setSummary(tailored.summary);
      if (tailored.skills) setSkills(tailored.skills.join(', '));
      
      if (tailored.experience) {
        const updatedExp = experiences.map(exp => {
          if (!exp.included) return exp;
          // Try to match the tailored experience back to our local state
          const matched = tailored.experience.find((t: any) => t.company === exp.company && t.role === exp.role);
          if (matched) {
            return { ...exp, description: matched.description };
          }
          return exp;
        });
        setExperiences(updatedExp);
      }
      
      showMessage("Resume tailored successfully!", "success");
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    setLoading(true);
    try {
      const details = getIncludedDetails();
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      if (!response.ok) throw new Error("Failed to generate PDF");

      // Handle PDF download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume_${name.replace(/\\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      
      showMessage("PDF generated successfully!", "success");
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const addExperience = () => {
    setExperiences([...experiences, { id: crypto.randomUUID(), company: '', role: '', duration: '', description: '', included: true }]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    setEducation([...education, { id: crypto.randomUUID(), institution: '', degree: '', year: '', included: true }]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    setEducation(education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
      {/* Settings Form */}
      <div className="flex-1 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Build Your Resume</h2>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Professional Summary</label>
              <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={4} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold text-slate-800">Experience</h3>
            <button onClick={addExperience} className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          
          {experiences.map((exp) => (
            <div key={exp.id} className={`p-4 border rounded-lg space-y-3 relative ${exp.included ? 'border-slate-300 bg-white' : 'border-slate-200 bg-slate-50 opacity-70'}`}>
              <button 
                onClick={() => updateExperience(exp.id, 'included', !exp.included)}
                className="absolute top-4 right-12 text-slate-400 hover:text-indigo-600"
                title={exp.included ? "Exclude from resume" : "Include in resume"}
              >
                {exp.included ? <CheckSquare className="w-5 h-5 text-indigo-600" /> : <Square className="w-5 h-5" />}
              </button>
              <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-600">
                <Trash2 className="w-5 h-5" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-16">
                <input type="text" placeholder="Company" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg w-full text-sm" />
                <input type="text" placeholder="Role" value={exp.role} onChange={e => updateExperience(exp.id, 'role', e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg w-full text-sm" />
                <input type="text" placeholder="Duration (e.g. Jan 2020 - Present)" value={exp.duration} onChange={e => updateExperience(exp.id, 'duration', e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg w-full text-sm" />
              </div>
              <textarea placeholder="Description" value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
          ))}
          {experiences.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No experience added yet.</p>}
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold text-slate-800">Education</h3>
            <button onClick={addEducation} className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          
          {education.map((edu) => (
            <div key={edu.id} className={`p-4 border rounded-lg space-y-3 relative ${edu.included ? 'border-slate-300 bg-white' : 'border-slate-200 bg-slate-50 opacity-70'}`}>
              <button 
                onClick={() => updateEducation(edu.id, 'included', !edu.included)}
                className="absolute top-4 right-12 text-slate-400 hover:text-indigo-600"
                title={edu.included ? "Exclude from resume" : "Include in resume"}
              >
                {edu.included ? <CheckSquare className="w-5 h-5 text-indigo-600" /> : <Square className="w-5 h-5" />}
              </button>
              <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-600">
                <Trash2 className="w-5 h-5" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-16 bg">
                <input type="text" placeholder="Institution" value={edu.institution} onChange={e => updateEducation(edu.id, 'institution', e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg w-full text-sm" />
                <input type="text" placeholder="Degree" value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg w-full text-sm" />
                <input type="text" placeholder="Year" value={edu.year} onChange={e => updateEducation(edu.id, 'year', e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg w-full text-sm" />
              </div>
            </div>
          ))}
          {education.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No education added yet.</p>}
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Skills</h3>
          <textarea 
            placeholder="Comma separated skills (e.g. React, Node.js, TypeScript)" 
            value={skills} 
            onChange={e => setSkills(e.target.value)} 
            rows={3} 
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
          />
        </div>
      </div>

      {/* Action / Tailor Panel */}
      <div className="w-full lg:w-96 space-y-6">
        <div className="bg-slate-800 text-white p-6 rounded-xl shadow-lg sticky top-24">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-indigo-400" />
            Tailor with AI
          </h3>
          <p className="text-sm text-slate-300 mb-4">
            Paste a job description below and Gemini will optimize your summary and included experience to match.
          </p>
          <textarea 
            placeholder="Paste Job Description here..."
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 mb-4"
          />
          <button 
            onClick={handleTailorWithGemini}
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? <span className="animate-pulse">Processing...</span> : <><Wand2 className="w-4 h-4" /> Tailor Resume</>}
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 sticky top-[450px]">
          <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Actions</h3>
          
          {message.text && (
            <div className={`p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {message.text}
            </div>
          )}

          <button 
            onClick={handleSaveToSupabase}
            disabled={loading}
            className="w-full py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors flex justify-center items-center gap-2"
          >
            <Save className="w-4 h-4 text-slate-500" /> Save Profile
          </button>
          
          <button 
            onClick={handleGeneratePDF}
            disabled={loading}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors flex justify-center items-center gap-2"
          >
            <FileDown className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
