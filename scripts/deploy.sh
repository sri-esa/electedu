#!/bin/bash
set -e

PROJECT_ID=${PROJECT_ID:-"your-project-id"}
REGION=${REGION:-"asia-south1"}

echo "Deploying ElectEdu to Cloud Run..."
echo "Project: $PROJECT_ID | Region: $REGION"

# Build backend
echo "Building backend..."
cd backend
npm run build
docker build -t gcr.io/$PROJECT_ID/electedu-backend .
docker push gcr.io/$PROJECT_ID/electedu-backend

# Deploy backend
gcloud run deploy electedu-backend \
  --image=gcr.io/$PROJECT_ID/electedu-backend \
  --region=$REGION \
  --allow-unauthenticated \
  --min-instances=0 \
  --max-instances=10 \
  --memory=512Mi \
  --set-secrets=GEMINI_API_KEY=GEMINI_API_KEY:latest \
  --set-env-vars=PROJECT_ID=$PROJECT_ID \
  --project=$PROJECT_ID

BACKEND_URL=$(gcloud run services describe electedu-backend \
  --region=$REGION --format="value(status.url)")
echo "Backend deployed: $BACKEND_URL"

# Build frontend
echo "Building frontend..."
cd ../frontend
VITE_BACKEND_URL=$BACKEND_URL npm run build

# Package and deploy frontend
docker build -t gcr.io/$PROJECT_ID/electedu-frontend .
docker push gcr.io/$PROJECT_ID/electedu-frontend

gcloud run deploy electedu-frontend \
  --image=gcr.io/$PROJECT_ID/electedu-frontend \
  --region=$REGION \
  --allow-unauthenticated \
  --min-instances=0 \
  --max-instances=5 \
  --memory=256Mi \
  --project=$PROJECT_ID

FRONTEND_URL=$(gcloud run services describe electedu-frontend \
  --region=$REGION --format="value(status.url)")

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "ELECTEDU DEPLOYED SUCCESSFULLY"
echo "Frontend: $FRONTEND_URL"
echo "Backend:  $BACKEND_URL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
