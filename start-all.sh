#!/bin/bash

echo "Starting Dropshipping Order Management System..."
echo
echo "This will start both backend and frontend servers."
echo "Backend: http://localhost:8081"
echo "Frontend: http://localhost:3000"
echo
echo "Press Enter to continue or Ctrl+C to cancel..."
read

echo "Starting backend server in background..."
gnome-terminal --title="Backend Server" -- bash -c "./start-backend.sh; exec bash" 2>/dev/null || \
xterm -title "Backend Server" -e "./start-backend.sh" 2>/dev/null || \
osascript -e 'tell application "Terminal" to do script "./start-backend.sh"' 2>/dev/null || \
echo "Could not open terminal for backend. Please run ./start-backend.sh manually in a new terminal."

echo "Waiting 10 seconds for backend to start..."
sleep 10

echo "Starting frontend server in new terminal..."
gnome-terminal --title="Frontend Server" -- bash -c "./start-frontend.sh; exec bash" 2>/dev/null || \
xterm -title "Frontend Server" -e "./start-frontend.sh" 2>/dev/null || \
osascript -e 'tell application "Terminal" to do script "./start-frontend.sh"' 2>/dev/null || \
echo "Could not open terminal for frontend. Please run ./start-frontend.sh manually in a new terminal."

echo
echo "Both servers are starting..."
echo "Backend: http://localhost:8081"
echo "Frontend: http://localhost:3000"
echo
echo "Check the opened terminal windows for server status."
echo "To stop the servers, press Ctrl+C in each terminal window."
