$ErrorActionPreference = "Stop"

$PROJECT_ID = "election-education-system"
$REGION = "us-central1"
$BACKEND_SERVICE = "electedu-backend"
$FRONTEND_SERVICE = "electedu-frontend"

Write-Host "Building backend..."
Set-Location backend
npm run build
docker build -t "gcr.io/$PROJECT_ID/${BACKEND_SERVICE}:latest" .
docker push "gcr.io/$PROJECT_ID/${BACKEND_SERVICE}:latest"

Write-Host "Deploying backend to Cloud Run..."
gcloud run deploy $BACKEND_SERVICE `
  --image="gcr.io/$PROJECT_ID/${BACKEND_SERVICE}:latest" `
  --region=$REGION `
  --platform=managed `
  --allow-unauthenticated `
  --min-instances=0 `
  --max-instances=10 `
  --memory=512Mi `
  --cpu=1 `
  --concurrency=80 `
  --timeout=30 `
  --set-secrets=GEMINI_API_KEY=GEMINI_API_KEY:latest `
  --set-env-vars=PROJECT_ID=$PROJECT_ID `
  --set-env-vars=ENABLE_PUBSUB=false `
  --set-env-vars=ENABLE_FIRESTORE=true `
  --set-env-vars=LOG_LEVEL=info `
  --project=$PROJECT_ID `
  --quiet

$BACKEND_URL = gcloud run services describe $BACKEND_SERVICE --region=$REGION --project=$PROJECT_ID --format="value(status.url)"
Write-Host "✅ Backend deployed: $BACKEND_URL"

Set-Location ../frontend

Write-Host "Building frontend Docker image with backend URL..."
docker build -t "gcr.io/$PROJECT_ID/${FRONTEND_SERVICE}:latest" --build-arg "VITE_BACKEND_URL=$BACKEND_URL" .
docker push "gcr.io/$PROJECT_ID/${FRONTEND_SERVICE}:latest"

Write-Host "Deploying frontend to Cloud Run..."
gcloud run deploy $FRONTEND_SERVICE `
  --image="gcr.io/$PROJECT_ID/${FRONTEND_SERVICE}:latest" `
  --region=$REGION `
  --platform=managed `
  --allow-unauthenticated `
  --min-instances=0 `
  --max-instances=5 `
  --memory=256Mi `
  --cpu=1 `
  --concurrency=1000 `
  --timeout=10 `
  --project=$PROJECT_ID `
  --quiet

$FRONTEND_URL = gcloud run services describe $FRONTEND_SERVICE --region=$REGION --project=$PROJECT_ID --format="value(status.url)"
Write-Host "✅ Frontend deployed: $FRONTEND_URL"
Set-Location ..
