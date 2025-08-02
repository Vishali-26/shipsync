#!/bin/bash

echo "Starting Dropshipping Order Management Frontend..."
echo

cd frontend

echo "Checking if Node.js is installed..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js found. Checking if npm is installed..."
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed or not in PATH"
    exit 1
fi

echo "npm found. Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo "Dependencies installed. Starting React development server..."
echo "Frontend will be available at: http://localhost:3000"
echo
echo "Press Ctrl+C to stop the frontend server"
echo

npm run dev
