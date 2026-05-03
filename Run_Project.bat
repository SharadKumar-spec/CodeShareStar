@echo off
echo ==========================================
echo   🚀 CodeShare - Startup Script
echo ==========================================

:: Kill old processes if any
npx kill-port 4000 3000 2>nul

:: Start Backend
echo [+] Starting Backend Server...
cd codeshare-backend
start "CodeShare Backend" cmd /c "npm run dev"

:: Start Frontend
echo [+] Starting Frontend Development Server...
cd ../codeshare-frontend
start "CodeShare Frontend" cmd /c "npm run dev"

:: Wait and open browser to Guest Page
echo [+] Waiting for servers to initialize...
timeout /t 8 /nobreak > nul
echo [+] Opening Guest HomePage...
start http://localhost:3000

echo.
echo ==========================================
echo   ✅ Everything is running!
echo   - Guest Page: http://localhost:3000
echo ==========================================
exit
