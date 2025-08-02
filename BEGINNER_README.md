# Simple Dropshipping Order Management System - For Beginners

A basic full-stack application to learn Spring Boot and web development fundamentals.

## What You'll Learn
- Basic Spring Boot REST APIs
- Simple database operations with JPA
- Basic HTML/CSS/JavaScript frontend
- MySQL database integration
- CRUD operations (Create, Read, Update, Delete)

## Technology Stack (Simplified)
- **Backend**: Java Spring Boot (without complex security)
- **Database**: MySQL 
- **Frontend**: Simple HTML with JavaScript
- **No JWT, No complex authentication, No roles** - Just basic functionality!

## Prerequisites
- Java 17+
- MySQL installed and running
- Basic knowledge of Java
- A web browser

## Quick Setup

### 1. Database Setup
Make sure MySQL is running with:
- Username: `root`
- Password: `vichu` (as configured)
- The application will auto-create the `dropship` database

### 2. Start the Backend
```bash
cd backend
mvn spring-boot:run
```
Backend will start on: http://localhost:8081

### 3. Open the Frontend
Simply open `frontend/simple-frontend.html` in your web browser!

## What the Application Does

### Backend APIs (Spring Boot)
- **POST /api/users** - Create a new user
- **POST /api/users/login** - Simple login (username/password check)
- **GET /api/users** - Get all users
- **POST /api/products** - Add a new product
- **GET /api/products** - Get all products
- **POST /api/orders** - Create a new order
- **GET /api/orders** - Get all orders

### Frontend (Simple HTML)
- User registration form
- Simple login form
- Add products form
- Create orders form
- View all products and orders

## Database Tables Created Automatically
1. **users** - Stores user information
2. **products** - Stores product catalog
3. **orders** - Stores order information

## How to Test

### 1. Create a User
- Open the HTML file in browser
- Fill the "Register New User" form
- Click "Register User"

### 2. Login
- Use the username/password you just created
- Click "Login"

### 3. Add Products
- Fill the "Add New Product" form
- Click "Add Product"
- Products will appear in the list below

### 4. Create Orders
- Use the User ID from step 1
- Fill order details
- Click "Create Order"

## Learning Points for Beginners

### Backend (Spring Boot)
1. **@RestController** - Makes a class handle web requests
2. **@RequestMapping** - Maps URLs to methods
3. **@Autowired** - Automatically connects components
4. **@Entity** - Marks a class as a database table
5. **JpaRepository** - Provides database operations

### Frontend (HTML/JavaScript)
1. **fetch()** - Makes HTTP requests to backend
2. **async/await** - Handles asynchronous operations
3. **JSON** - Data format for API communication
4. **DOM manipulation** - Updates webpage content

### Database (JPA/Hibernate)
1. **@Id** - Marks primary key
2. **@GeneratedValue** - Auto-generates IDs
3. **spring.jpa.hibernate.ddl-auto=update** - Auto-creates tables

## Project Structure (Simplified)
```
backend/
├── src/main/java/com/dropship/ordermanagement/
│   ├── OrderManagementApplication.java  # Main Spring Boot class
│   ├── model/                          # Database entities
│   │   ├── User.java
│   │   ├── Product.java
│   │   └── Order.java
│   ├── repository/                     # Database access
│   │   ├── UserRepository.java
│   │   ├── ProductRepository.java
│   │   └── OrderRepository.java
│   └── controller/                     # REST API endpoints
│       ├── SimpleUserController.java
│       ├── SimpleProductController.java
│       └── SimpleOrderController.java
├── src/main/resources/
│   └── application.properties          # Database configuration
└── pom.xml                            # Dependencies

frontend/
└── simple-frontend.html              # Complete frontend in one file
```

## Common Beginner Mistakes to Avoid
1. **Forgetting to start MySQL** - Make sure MySQL is running
2. **Wrong database credentials** - Check username/password in application.properties
3. **Port conflicts** - Make sure port 8081 is free
4. **CORS errors** - Already configured for localhost

## Next Steps for Learning
1. Add validation to forms
2. Add edit/delete functionality
3. Improve the UI with CSS frameworks
4. Add more complex relationships between entities
5. Learn about Spring Security for authentication
6. Add unit tests

## Troubleshooting
- **Backend won't start**: Check if MySQL is running and credentials are correct
- **Frontend can't connect**: Make sure backend is running on port 8081
- **Database errors**: Check MySQL service and credentials

## Sample Data to Test
```json
// Sample User
{
  "username": "john",
  "email": "john@example.com", 
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "CUSTOMER"
}

// Sample Product
{
  "name": "Laptop",
  "description": "Gaming Laptop",
  "price": 999.99,
  "stockQuantity": 10,
  "category": "Electronics"
}

// Sample Order
{
  "userId": 1,
  "totalAmount": 999.99,
  "shippingAddress": "123 Main St, City, State"
}
```

This is a perfect starting project for learning Spring Boot basics! 🚀
