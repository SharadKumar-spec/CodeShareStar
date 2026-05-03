@echo off
setlocal
title CodeShare - Teacher Test Mode

echo ===================================================
echo   🚀 CodeShare - STARTING FOR TEACHER TEST
echo ===================================================
echo.
echo [+] Note: Running in LITE MODE (No Database Required)
echo.

:: 1. Backend Start
echo [1/3] Starting Backend Server...
cd codeshare-backend
start "CodeShare Backend" cmd /k "npm install && npm run dev"
cd ..

:: 2. Frontend Start
echo [2/3] Starting Frontend Server...
cd codeshare-frontend
start "CodeShare Frontend" cmd /k "npm install && npm run dev"
cd ..

:: 3. Wait and Open Browser
echo [3/3] Waiting for servers to initialize...
timeout /t 10 /nobreak > nul

echo [+] Launching Application for Test...
start http://localhost:3000/?auto=true

echo.
echo ===================================================
echo   ✅ SUCCESS: Check your browser!
echo   - App: http://localhost:3000
echo   - Backend: http://localhost:4000
echo ===================================================
pause
