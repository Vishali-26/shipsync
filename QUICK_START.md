# Quick Start Guide

## Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Maven (for backend)
- npm (comes with Node.js)

## Quick Setup (Windows)

### Option 1: Automatic Setup
1. Double-click `start-all.bat` to start both backend and frontend servers automatically

### Option 2: Manual Setup
1. Double-click `start-backend.bat` to start the backend server
2. Double-click `start-frontend.bat` to start the frontend server

## Quick Setup (Linux/Mac)

### Option 1: Automatic Setup
```bash
chmod +x *.sh
./start-all.sh
```

### Option 2: Manual Setup
```bash
chmod +x *.sh
./start-backend.sh    # In one terminal
./start-frontend.sh   # In another terminal
```

## Access the Application

1. **Frontend**: http://localhost:3000
2. **Backend API**: http://localhost:8081
3. **H2 Database Console**: http://localhost:8081/h2-console (for development)

## First Time Setup

1. Open http://localhost:3000 in your browser
2. Click "Sign Up" to create a new account
3. Fill in the registration form
4. For admin access, create a user and then use the API to set role to ADMIN

### Create Admin User via API
```bash
# Register admin user
curl -X POST http://localhost:8081/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com", 
    "password": "password123",
    "firstName": "Admin",
    "lastName": "User",
    "role": "ADMIN"
  }'

# Login to get token
curl -X POST http://localhost:8081/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'
```

## Test the Application

### As Admin:
1. Login with admin credentials
2. Go to "Manage Products" to add products
3. View dashboard for statistics

### As Customer:
1. Register a new customer account
2. Browse products
3. Add products to cart
4. Place orders
5. Track order status

## Stopping the Servers

- **Windows**: Close the command prompt windows or press Ctrl+C in each window
- **Linux/Mac**: Press Ctrl+C in each terminal window

## Troubleshooting

### Backend won't start:
- Check if Java 17+ is installed: `java -version`
- Check if Maven is installed: `mvn -version`
- Check if port 8081 is available

### Frontend won't start:
- Check if Node.js is installed: `node -version`
- Check if npm is installed: `npm -version`
- Run `npm install` in the frontend directory
- Check if port 3000 is available

### Database issues:
- The application uses H2 in-memory database by default
- Data will be lost when the backend restarts
- To use MySQL, update `backend/src/main/resources/application.properties`

### CORS issues:
- Make sure backend is running on port 8081
- Make sure frontend is running on port 3000
- CORS is pre-configured for these ports

## Default Test Data

After starting the application, you can:
1. Create an admin user using the API (see above)
2. Login as admin and add some test products
3. Create a customer account and test ordering

## Next Steps

1. Read the full README.md for detailed documentation
2. Explore the API endpoints
3. Customize the application for your needs
4. Set up MySQL for production use
