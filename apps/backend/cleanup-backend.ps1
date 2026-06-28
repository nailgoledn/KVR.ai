param([string]$action)

Write-Host "KVRAT Control Panel"

if ($action -eq "stop") {
    Write-Host "Stopping Node processes..."
    taskkill /F /IM node.exe 2>$null
}
elseif ($action -eq "clean") {
    Write-Host "Cleaning project..."

    npx rimraf "C:\k\KVRAT\apps\backend\node_modules"
    npx rimraf "C:\k\KVRAT\apps\backend\dist"
    npx rimraf "C:\k\KVRAT\apps\backend\.next"

    Remove-Item "C:\k\KVRAT\apps\backend\kvrat.db" -Force -ErrorAction SilentlyContinue
    Remove-Item "C:\k\KVRAT\apps\backend\db.sqlite" -Force -ErrorAction SilentlyContinue

    Write-Host "DONE ✔"
}
else {
    Write-Host "Usage:"
    Write-Host "  stop"
    Write-Host "  clean"
}