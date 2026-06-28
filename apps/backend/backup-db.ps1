$source = "C:\k\KVRAT\apps\backend\kvrat.db"

$date = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"

$destination = "E:\KVRAT_BACKUP\kvrat_$date.db"

Copy-Item $source $destination -Force

Write-Host ""
Write-Host "================================="
Write-Host "KVRAT BACKUP CREATED"
Write-Host "================================="
Write-Host $destination
Write-Host ""
