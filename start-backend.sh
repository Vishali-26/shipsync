#!/bin/bash

echo "Starting Dropshipping Order Management Backend..."
echo

cd backend

echo "Checking if Maven is installed..."
if ! command -v mvn &> /dev/null; then
    echo "ERROR: Maven is not installed or not in PATH"
    echo "Please install Maven and add it to your PATH"
    exit 1
fi

echo "Maven found. Starting Spring Boot application..."
echo "Backend will be available at: http://localhost:8081"
echo
echo "Press Ctrl+C to stop the backend server"
echo

mvn spring-boot:run
