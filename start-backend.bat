@echo off
echo Starting Dropshipping Order Management Backend...
echo.

cd backend

echo Checking if Maven is installed...
mvn --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven and add it to your PATH
    pause
    exit /b 1
)

echo Maven found. Starting Spring Boot application...
echo Backend will be available at: http://localhost:8081
echo.
echo Press Ctrl+C to stop the backend server
echo.

mvn spring-boot:run

pause
