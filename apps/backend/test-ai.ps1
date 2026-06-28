$base = "http://localhost:4001"

Write-Host "Testing AI Route..."
Invoke-RestMethod -Uri "$base/ai/route" -Method Post -ContentType "application/json" -Body '{"message":"create landing page image for KVRAT"}'

Write-Host "Testing Brain Route..."
Invoke-RestMethod -Uri "$base/ai/brain" -Method Post -ContentType "application/json" -Body '{"message":"analyze wallet system"}'

Write-Host "Testing Image Generator..."
Invoke-RestMethod -Uri "$base/ai/image" -Method Post -ContentType "application/json" -Body '{"prompt":"KVRAT futuristic landing page hero section"}'
