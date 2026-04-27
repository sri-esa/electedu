# ElectEdu — AI-Powered Election Education Assistant

> Built for Google Promptwar 2026 using Google Antigravity IDE

## 🌐 Live Demo
**[https://electedu-frontend-tao65ubuta-uc.a.run.app](https://electedu-frontend-tao65ubuta-uc.a.run.app)**

## Overview
ElectEdu is an interactive AI assistant that helps users understand 
the election process, timelines, and civic rights in an accessible, 
accurate, and engaging way — powered by Google Gemini 1.5 Flash.

## Chosen Vertical
Election Process Education — helping citizens understand how elections 
work in India and globally, in plain language with cited sources.

## Key Features

1. **Guided Learning Flows** — Step-by-step walkthroughs for first-time 
   voters, EVM understanding, and vote counting
2. **Interactive Election Timeline** — Visual, clickable timeline of the 
   complete election process from announcement to swearing-in
3. **Multi-country Support** — Switch between India, USA, UK, and EU 
   election systems with automatic context switching
4. **Plain Language Mode** — Simplifies all AI responses to Grade 6 
   reading level for accessibility
5. **Offline Fallback** — Pre-rendered FAQ cards work without AI 
   connection (graceful degradation)
6. **Non-partisan Guardrails** — Hard-coded safety rules in the Gemini 
   system prompt prevent political bias regardless of user prompting

## AI Architecture

The Gemini system prompt uses a 4-layer design:

```
Layer 1: Identity       — Who ElectEdu is (immutable)
Layer 2: Knowledge      — Country-specific election data (per session)
Layer 3: User Context   — Language, plain language mode, flow step
Layer 4: Safety Rules   — Political neutrality, PII rejection (immutable)
```

Safety rules are always injected last and cannot be overridden by 
user prompt injection attempts.

## How It Works

1. User opens ElectEdu and selects their learning goal
2. Guided flow OR free question mode activates
3. Backend constructs 4-layer Gemini prompt with:
   - Country-specific election data (from curated JSON knowledge base)
   - User context (language, plain language mode, flow step)
   - Immutable safety and neutrality rules
4. Gemini responds with cited, accurate information
5. Session state persists locally — no login required
6. If API unavailable — static FAQ cards load automatically

## Google Services Used

| Service | Purpose |
|---------|---------|
| Gemini 1.5 Flash API | Conversational AI engine |
| Cloud Firestore | Anonymous session analytics |
| Cloud Run | Frontend + Backend hosting |
| Cloud Pub/Sub | Async usage event logging |
| BigQuery | Analytics data warehouse |
| Cloud Text-to-Speech | Audio output for accessibility |
| Google Translate API | Multi-language UI support |
| Google Analytics 4 | User journey tracking |

## Tech Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend:** Node.js + Fastify + TypeScript
- **AI:** Google Gemini 1.5 Flash
- **Database:** Cloud Firestore (Native Mode)
- **Deployment:** Google Cloud Run (free tier)

## Project Structure

```
electedu/
├── frontend/     # React + Vite app
├── backend/      # Node.js + Fastify API
├── data/         # Static JSON knowledge base
│   ├── elections/    # Phase data, results
│   ├── myths/        # Misinformation registry with rebuttals
│   ├── faq/          # Pre-rendered offline FAQ content
│   └── timeline/     # Election timeline node data
├── docs/         # Architecture documentation
└── scripts/      # Deployment scripts
```

## Local Development

### Prerequisites
- Node.js 20+
- Google Cloud project with Gemini API enabled
- gcloud CLI authenticated

### Setup

```bash
git clone https://github.com/sri-esa/electedu.git
cd electedu

cd frontend && npm install
cd ../backend && npm install

cp backend/.env.example backend/.env
# Add your GEMINI_API_KEY and PROJECT_ID

cd backend && npm run dev
# New terminal:
cd frontend && npm run dev
```

### Environment Variables
See `backend/.env.example` for all required variables.

## Deployment

```bash
export PROJECT_ID=election-education-system
bash scripts/deploy.sh
```

## Assumptions Made

- Election data is curated for 2024 Indian Lok Sabha elections as 
  the primary example; other years/countries use Gemini general knowledge
- Plain Language Mode targets approximately Grade 6 reading level
- No user PII is collected or stored server-side
- NRI voters must physically be present in constituency to vote in India

## Testing

```bash
cd backend && npm test
cd ../frontend && npm test
```