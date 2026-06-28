Write-Host "🚀 Starting KVRAT Full System..." -ForegroundColor Cyan

# === BACKEND ===
Start-Process powershell -ArgumentList "-NoExit", "-Command cd C:\k\KVRAT\apps\backend; npm run start:dev"

# === FRONTEND (Next.js) ===
Start-Process powershell -ArgumentList "-NoExit", "-Command cd C:\k\KVRAT\apps\kvrat_app; npm run dev"

# === FLUTTER (optional) ===
# Start-Process powershell -ArgumentList "-NoExit", "-Command cd C:\k\flutter_app; flutter run -d chrome"

Write-Host "✅ All services started" -ForegroundColor Green