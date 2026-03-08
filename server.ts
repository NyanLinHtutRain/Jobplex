import express from "express";
import { createServer as createViteServer } from "vite";
import PDFDocument from "pdfkit";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "";

let supabase: any;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn("WARNING: Supabase credentials missing. Database features will be disabled.");
  // Provide a mock supabase object or handle null checks in endpoints
  supabase = {
    from: () => ({
      insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }) }) }),
      select: () => ({ eq: () => Promise.resolve({ data: [], error: new Error("Supabase not configured") }) }),
      update: () => ({ eq: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }) }) }) }),
    })
  };
}

const geminiApiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- Resume Endpoints ---

  // Create a new resume
  app.post("/api/resumes", async (req, res) => {
    try {
      const { user_id, title, details } = req.body;
      if (!user_id || !title || !details) {
        return res.status(400).json({ error: "user_id, title, and details are required" });
      }

      const { data, error } = await supabase
        .from("resumes")
        .insert([{ user_id, title, details }])
        .select()
        .single();

      if (error) throw error;
      res.status(201).json(data);
    } catch (error) {
      console.error("Error creating resume:", error);
      res.status(500).json({ error: "Failed to create resume" });
    }
  });

  // Get user's resumes
  app.get("/api/resumes", async (req, res) => {
    try {
      const user_id = req.query.user_id as string;
      if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
      }

      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", user_id);

      if (error) throw error;
      res.json(data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      res.status(500).json({ error: "Failed to fetch resumes" });
    }
  });

  // Tailor a resume using Gemini
  app.post("/api/resumes/tailor", async (req, res) => {
    try {
      const { resumeDetails, jobDescription } = req.body;

      if (!resumeDetails || !jobDescription) {
        return res.status(400).json({ error: "resumeDetails and jobDescription are required" });
      }

      const prompt = `
        You are an expert resume writer. I will provide you with a candidate's current resume details and a target job description.
        Please tailor the resume's "summary" and "experience" fields to better align with the job description.
        Make the summary more impactful and emphasize the skills/experiences that match the job descripion.
        Do not invent new work history or fake facts, just rephrase and highlight the relevant existing experience.

        Target Job Description:
        ${jobDescription}

        Current Resume Details:
        ${JSON.stringify(resumeDetails, null, 2)}

        Return ONLY a JSON object with the identical structure to the input "Current Resume Details", but with optimized "summary", "experience" (arrays of experience should have optimized descriptions), and potentially suggesting targeted "skills" to emphasize if they possess them. Make sure it is valid JSON. Do not include markdown \`\`\`json wrappers.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      let tailoredText = response.text;
      if (!tailoredText) throw new Error("No response from Gemini");

      // Clean up markdown if Gemini returned it despite instructions
      tailoredText = tailoredText.replace(/```json/g, "").replace(/```/g, "").trim();

      const tailoredResume = JSON.parse(tailoredText);
      res.json(tailoredResume);

    } catch (error) {
      console.error("Error tailoring resume:", error);
      res.status(500).json({ error: "Failed to tailor resume" });
    }
  });

  // --- Job Application Endpoints ---

  // Create an application
  app.post("/api/applications", async (req, res) => {
    try {
      const { user_id, job_title, company_name, status, resume_id } = req.body;
      if (!user_id || !job_title || !company_name) {
        return res.status(400).json({ error: "user_id, job_title, and company_name are required" });
      }

      const { data, error } = await supabase
        .from("applications")
        .insert([{ user_id, job_title, company_name, status: status || 'Applied', resume_id }])
        .select()
        .single();

      if (error) throw error;
      res.status(201).json(data);
    } catch (error) {
      console.error("Error creating application:", error);
      res.status(500).json({ error: "Failed to create application" });
    }
  });

  // Get user's applications
  app.get("/api/applications", async (req, res) => {
    try {
      const user_id = req.query.user_id as string;
      if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
      }

      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user_id);

      if (error) throw error;
      res.json(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  // Update application status
  app.put("/api/applications/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ error: "status is required" });
      }

      const { data, error } = await supabase
        .from("applications")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error) {
      console.error("Error updating application:", error);
      res.status(500).json({ error: "Failed to update application" });
    }
  });

  // --- Job Search Mock Endpoint ---
  
  app.get("/api/jobs/search", async (req, res) => {
    try {
      const query = req.query.q as string || "Software Engineer";
      
      // We will generate 3 mock job listings using Gemini to simulate a real search
      const prompt = `Generate 3 realistic mock job listings for the search query: "${query}". 
      Return ONLY a JSON array of objects. Each object should have these keys: "id" (a random uuid or string), "title", "company", "location", "salary", "description", "postedAt" (e.g. "2 days ago"). Do not include markdown \`\`\`json wrappers.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      let text = response.text;
      if (!text) throw new Error("No response from Gemini");

      text = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const mockJobs = JSON.parse(text);
      res.json(mockJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  // API Route: Generate PDF from JSON
  app.post("/api/generate-pdf", (req, res) => {
    try {
      const { name, email, phone, summary, experience, education, skills } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      const doc = new PDFDocument({ margin: 50 });

      // Set response headers
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=resume_${name.replace(/\s+/g, '_')}.pdf`);

      doc.pipe(res);

      // Header
      doc.fontSize(24).text(name, { align: "center" });
      doc.fontSize(10).text(`${email} | ${phone}`, { align: "center" });
      doc.moveDown();
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      // Summary
      if (summary) {
        doc.fontSize(14).text("Professional Summary", { underline: true });
        doc.fontSize(11).text(summary);
        doc.moveDown();
      }

      // Experience
      if (experience && Array.isArray(experience)) {
        doc.fontSize(14).text("Experience", { underline: true });
        experience.forEach((exp: any) => {
          doc.fontSize(12).text(`${exp.role} at ${exp.company}`, { oblique: true });
          doc.fontSize(10).text(`${exp.duration}`);
          doc.fontSize(11).text(exp.description);
          doc.moveDown(0.5);
        });
        doc.moveDown();
      }

      // Education
      if (education && Array.isArray(education)) {
        doc.fontSize(14).text("Education", { underline: true });
        education.forEach((edu: any) => {
          doc.fontSize(12).text(`${edu.degree} - ${edu.institution}`);
          doc.fontSize(10).text(`${edu.year}`);
          doc.moveDown(0.5);
        });
        doc.moveDown();
      }

      // Skills
      if (skills && Array.isArray(skills)) {
        doc.fontSize(14).text("Skills", { underline: true });
        doc.fontSize(11).text(skills.join(", "));
      }

      doc.end();
    } catch (error) {
      console.error("PDF Generation Error:", error);
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve("dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
