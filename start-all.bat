@echo off
echo Starting Dropshipping Order Management System...
echo.
echo This will start both backend and frontend servers.
echo Backend: http://localhost:8081
echo Frontend: http://localhost:3000
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause >nul

echo Starting backend server...
start "Backend Server" cmd /k "start-backend.bat"

echo Waiting 10 seconds for backend to start...
timeout /t 10 /nobreak >nul

echo Starting frontend server...
start "Frontend Server" cmd /k "start-frontend.bat"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8081
echo Frontend: http://localhost:3000
echo.
echo You can close this window. The servers will continue running in separate windows.
echo To stop the servers, close their respective windows or press Ctrl+C in each.
echo.
pause
