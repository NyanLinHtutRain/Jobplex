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
* **Tailwind CSS (v3)** - Utility-first styling for a completely bespoke, responsive design.
* **Framer Motion** - Delivering premium, staggered micro-animations and smooth transition flows.
* **Lucide React** - Beautiful, consistent SVG iconography.

### ⚙️ Backend & Deployment
* **Nginx** - Ultra-fast, lightweight web-server routing the compiled front-end.
* **Docker** - Containerized the static bundle and web-server for isolated, portable execution.
* **Google Cloud Run** - Serverless, highly-scalable cloud hosting.
* **Google Artifact Registry** - Secure cloud repository for storing the Docker images.
* **GitHub Actions / Git** - Version control tracking across `Autoapply-agent` and `master` branches.

## How we built it
We used React and Tailwind CSS for the frontend to achieve a "Supabase-inspired" technical aesthetic. The intelligence layer is conceptualized with Gemini 1.5 Flash for resume parsing and matching, while the deployment is optimized for Google Cloud Run using a containerized Nginx setup.

## Challenges we ran into
The biggest hurdle was designing a "High-Trust" UI for an autonomous process. We had to move beyond a static dashboard to create a Live Activity Feed so users could see exactly what the agent was doing in real-time, preventing the "black box" feeling of AI.

## Accomplishments that we're proud of
We successfully designed a seamless bridge between a Resume Builder and an Auto-Apply Agent. Seeing a resume update in real-time and immediately becoming "deployable" by the agent felt like a major UX win.

## What we learned
We learned that prompt engineering isn't just about text; it's about Visual Logic. By strictly defining component states and design tokens in our prompts, we could maintain a consistent professional brand across multiple complex screens.

## What's next for JobPlex
We plan to integrate Multi-Agent Orchestration, where one agent finds the job, another tailors the resume specifically for that JD, and a third handles the interview scheduling via calendar integrations.
