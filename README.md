<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Jobplex – The Autonomous Career Engine

Jobplex turns the job hunt into a background process, letting engineers focus on upskilling while an agent handles the "grunt work."

🌍 **Live Application**: [https://jobplex-dashboard-1086198264621.us-central1.run.app](https://jobplex-dashboard-1086198264621.us-central1.run.app)

---

## Inspiration
As developers, we love automating everything—except our own job searches. We found ourselves spending hours manually filling out the same forms on LinkedIn and JobStreet. We built Jobplex to turn the job hunt into a background process, letting engineers focus on upskilling while an agent handles the "grunt work."

## What it does
Jobplex is an autonomous career engine. Users upload a resume and set their preferences; then, the Auto-Apply Agent takes over. It scans top job boards, matches skills using AI, submits applications, and even drafts cold emails to HR. It includes a live-preview Resume Builder and a Kanban tracker to keep the entire pipeline organized.

## Built With

### 🎨 Frontend & Design
* **React 18** - Component-driven architecture and state management.
* **Vite** - High-performance tooling and lightning-fast HMR for development.
* **Tailwind CSS (v3/v4)** - Utility-first styling for a completely bespoke, responsive design.
* **Framer Motion** - Delivering premium, staggered micro-animations and smooth transition flows.
* **Lucide React** - Beautiful, consistent SVG iconography.

### ⚙️ Backend & Deployment
* **Express & Node.js** - Robust backend layer for AI processing and PDF generation.
* **Google Gemini AI** - Powering the resume parsing and job matching intelligence.
* **Supabase** - Real-time database and authentication.
* **Nginx** - Ultra-fast, lightweight web-server routing the compiled front-end.
* **Docker** - Containerized the static bundle and web-server for isolated, portable execution.
* **Google Cloud Run** - Serverless, highly-scalable cloud hosting.
* **Google Artifact Registry** - Secure cloud repository for storing the Docker images.
* **GitHub Actions / Git** - Version control tracking across `Autoapply-agent` and `master` branches.

## Run Locally
1. Install dependencies: `npm install`
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app: `npm run dev`
