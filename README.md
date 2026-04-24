# ElectEdu — AI-Powered Election Education Assistant

## Overview
ElectEdu is an interactive AI assistant that helps users 
understand the election process, timelines, and civic rights 
in an accessible, accurate, and engaging way.

Built for Google Promptwar 2026 using Google Antigravity IDE.

## Chosen Vertical
Election Process Education — helping citizens understand 
how elections work in India and globally.

## Approach and Logic

### AI Architecture
- **Gemini 1.5 Flash** as the conversational AI engine
- **4-layer system prompt**: Identity → Knowledge Context → 
  User Context → Safety Rules
- **Static JSON knowledge base** overrides Gemini's general 
  knowledge with authoritative, curated election data
- **Myth registry** detects and rebuts common election 
  misinformation with cited sources

### Key Features
1. **Guided Learning Flows** — Step-by-step walkthroughs for 
   first-time voters, EVM understanding, and vote counting
2. **Interactive Election Timeline** — Visual, clickable 
   timeline of the complete election process
3. **Multi-country Support** — Switch between India, USA, 
   UK, and EU election systems
4. **Plain Language Mode** — Simplifies all AI responses 
   to Grade 6 reading level for accessibility
5. **Offline Fallback** — Pre-rendered FAQ cards work 
   without AI connection (REQ-10)
6. **Non-partisan Guardrails** — Hard-coded safety rules 
   prevent political bias in all AI responses

### How It Works
1. User opens ElectEdu and selects their learning goal
2. Guided flow OR free question mode activates
3. Backend constructs 4-layer Gemini prompt with:
   - Country-specific election data (from JSON knowledge base)
   - User context (language, plain language mode, flow step)
   - Immutable safety and neutrality rules
4. Gemini responds with cited, accurate information
5. Session state persists locally — no login required

## Assumptions Made
- Election data is curated for 2024 Indian Lok Sabha elections
  as the primary example; other years/countries use general knowledge
- Plain Language Mode targets approximately Grade 6 reading level
- No user PII is collected or stored server-side
- NRI voters must physically be present to vote in India
  (no overseas voting for general elections)

## Google Services Used
| Service | Purpose |
|---------|---------|
| Gemini 1.5 Flash API | Conversational AI engine |
| Cloud Firestore | Anonymous session analytics |
| Cloud Run | Frontend + Backend hosting |
| Cloud Pub/Sub | Async usage event logging |
| BigQuery | Analytics data warehouse |
| Cloud Text-to-Speech | Audio for accessibility |
| Google Translate API | Multi-language UI support |
| Google Analytics 4 | User journey tracking |

## Tech Stack
- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend:** Node.js + Fastify + TypeScript
- **AI:** Google Gemini 1.5 Flash
- **Database:** Cloud Firestore
- **Deployment:** Google Cloud Run

## Local Development

### Prerequisites
- Node.js 20+
- Google Cloud project with Gemini API enabled
- gcloud CLI authenticated

### Setup
\`\`\`bash
# Clone repo
git clone https://github.com/sri-esa/electedu.git
cd electedu

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies  
cd ../backend && npm install

# Configure environment
cp backend/.env.example backend/.env
# Fill in your GEMINI_API_KEY and PROJECT_ID

# Start backend
cd backend && npm run dev

# Start frontend (new terminal)
cd frontend && npm run dev
\`\`\`

### Environment Variables
See `backend/.env.example` for all required variables.

## Deployment
\`\`\`bash
bash scripts/deploy.sh
\`\`\`

## Project Structure
\`\`\`
electedu/
├── frontend/     # React + Vite app
├── backend/      # Node.js + Fastify API
├── data/         # Static JSON knowledge base
├── docs/         # Architecture documentation
└── scripts/      # Deployment scripts
\`\`\`