#!/bin/bash
# ElectEdu — Cloud Run Deployment Script
# Usage: bash scripts/deploy.sh

set -e  # Exit on any error

# ── CONFIGURATION ──────────────────────────────────────
PROJECT_ID=${PROJECT_ID:-"crowd-management-system-492802"}
REGION=${REGION:-"us-central1"}
BACKEND_SERVICE="electedu-backend"
FRONTEND_SERVICE="electedu-frontend"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ElectEdu Deployment"
echo "  Project: $PROJECT_ID"
echo "  Region:  $REGION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── PREREQ CHECKS ──────────────────────────────────────
echo ""
echo "Checking prerequisites..."

command -v gcloud >/dev/null || { 
  echo "ERROR: gcloud CLI not found"; exit 1; 
}
command -v docker >/dev/null || { 
  echo "ERROR: Docker not found"; exit 1; 
}
command -v npm >/dev/null || { 
  echo "ERROR: npm not found"; exit 1; 
}

echo "✅ All prerequisites found"

# ── ENABLE APIS ────────────────────────────────────────
echo ""
echo "Enabling required GCP APIs..."
gcloud services enable \
  run.googleapis.com \
  containerregistry.googleapis.com \
  firestore.googleapis.com \
  pubsub.googleapis.com \
  secretmanager.googleapis.com \
  generativelanguage.googleapis.com \
  --project=$PROJECT_ID \
  --quiet

echo "✅ APIs enabled"

# ── DEPLOY BACKEND ─────────────────────────────────────
echo ""
echo "Building backend..."
cd backend
npm run build

echo "Building backend Docker image..."
docker build \
  -t gcr.io/$PROJECT_ID/$BACKEND_SERVICE:latest \
  -t gcr.io/$PROJECT_ID/$BACKEND_SERVICE:$(git rev-parse --short HEAD) \
  .

echo "Pushing backend image..."
docker push gcr.io/$PROJECT_ID/$BACKEND_SERVICE:latest

echo "Deploying backend to Cloud Run..."
gcloud run deploy $BACKEND_SERVICE \
  --image=gcr.io/$PROJECT_ID/$BACKEND_SERVICE:latest \
  --region=$REGION \
  --platform=managed \
  --allow-unauthenticated \
  --min-instances=0 \
  --max-instances=10 \
  --memory=512Mi \
  --cpu=1 \
  --concurrency=80 \
  --timeout=30 \
  --set-secrets=GEMINI_API_KEY=GEMINI_API_KEY:latest \
  --set-env-vars=PROJECT_ID=$PROJECT_ID \
  --set-env-vars=ENABLE_PUBSUB=false \
  --set-env-vars=ENABLE_FIRESTORE=true \
  --set-env-vars=LOG_LEVEL=info \
  --project=$PROJECT_ID \
  --quiet

BACKEND_URL=$(gcloud run services describe $BACKEND_SERVICE \
  --region=$REGION \
  --project=$PROJECT_ID \
  --format="value(status.url)")

echo "✅ Backend deployed: $BACKEND_URL"

# ── VERIFY BACKEND ─────────────────────────────────────
echo ""
echo "Verifying backend health..."
HEALTH=$(curl -sf $BACKEND_URL/health | python3 -c \
  "import sys,json; print(json.load(sys.stdin)['status'])" \
  2>/dev/null || echo "unknown")

if [ "$HEALTH" != "ok" ]; then
  echo "⚠️  Backend health check returned: $HEALTH"
  echo "   Check logs: gcloud run logs read $BACKEND_SERVICE --region=$REGION"
else
  echo "✅ Backend health: ok"
fi

# ── DEPLOY FRONTEND ────────────────────────────────────
echo ""
echo "Building frontend..."
cd ../frontend

echo "Building frontend Docker image with backend URL..."
docker build \
  -t gcr.io/$PROJECT_ID/$FRONTEND_SERVICE:latest \
  --build-arg VITE_BACKEND_URL=$BACKEND_URL \
  .

echo "Pushing frontend image..."
docker push gcr.io/$PROJECT_ID/$FRONTEND_SERVICE:latest

echo "Deploying frontend to Cloud Run..."
gcloud run deploy $FRONTEND_SERVICE \
  --image=gcr.io/$PROJECT_ID/$FRONTEND_SERVICE:latest \
  --region=$REGION \
  --platform=managed \
  --allow-unauthenticated \
  --min-instances=0 \
  --max-instances=5 \
  --memory=256Mi \
  --cpu=1 \
  --concurrency=1000 \
  --timeout=10 \
  --project=$PROJECT_ID \
  --quiet

FRONTEND_URL=$(gcloud run services describe $FRONTEND_SERVICE \
  --region=$REGION \
  --project=$PROJECT_ID \
  --format="value(status.url)")

echo "✅ Frontend deployed: $FRONTEND_URL"

# ── FINAL SUMMARY ──────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ELECTEDU DEPLOYED SUCCESSFULLY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  🌐 App URL:     $FRONTEND_URL"
echo "  ⚙️  Backend URL: $BACKEND_URL"
echo "  📊 Health:      $BACKEND_URL/health"
echo ""
echo "  Submit this URL to Promptwar:"
echo "  $FRONTEND_URL"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

cd ..
