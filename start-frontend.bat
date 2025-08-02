@echo off
echo Starting Dropshipping Order Management Frontend...
echo.

cd frontend

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found. Checking if npm is installed...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed or not in PATH
    pause
    exit /b 1
)

echo npm found. Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo Dependencies installed. Starting React development server...
echo Frontend will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the frontend server
echo.

npm run dev

pause
