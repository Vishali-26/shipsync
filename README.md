# Dropshipping Order Management System

A full-stack web application for managing dropshipping orders, built with Java Spring Boot backend and React.js frontend.

## Features

### Backend Features
- **JWT Authentication**: Secure authentication with role-based access control (Admin/Customer)
- **User Management**: User registration, login, and profile management
- **Product Management**: CRUD operations for products with inventory tracking
- **Order Management**: Complete order lifecycle from placement to delivery
- **Admin Dashboard**: Comprehensive admin panel with statistics and management tools
- **RESTful APIs**: Well-documented REST endpoints for all operations

### Frontend Features
- **Responsive Design**: Mobile-friendly interface with modern CSS
- **Role-based Navigation**: Different interfaces for admin and customer users
- **Product Catalog**: Browse, search, and filter products by category
- **Shopping Cart**: Add products to cart and place orders
- **Order Tracking**: Track order status and history
- **Admin Panel**: Manage products, orders, and view analytics

## Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.1**
- **Spring Security** (JWT Authentication)
- **Spring Data JPA** (Database operations)
- **H2 Database** (In-memory database for testing)
- **MySQL** (Production database - configurable)
- **Maven** (Dependency management)

### Frontend
- **React 18**
- **Vite** (Build tool)
- **React Router DOM** (Routing)
- **Axios** (HTTP client)
- **CSS3** (Styling)

## Prerequisites

- **Java 17** or higher
- **Node.js 16** or higher
- **npm** or **yarn**
- **MySQL** (optional - H2 is configured by default)

## Installation and Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Dropshipping order management"
```

### 2. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```

#### Run the Spring Boot application
```bash
mvn spring-boot:run
```

The backend will start on **http://localhost:8081**

#### Database Configuration
By default, the application uses H2 in-memory database. To use MySQL:

1. Install and start MySQL
2. Create a database named `dropship`
3. Update `src/main/resources/application.properties`:
```properties
# Database Configuration - MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/dropship?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true
```

### 3. Frontend Setup

#### Navigate to frontend directory
```bash
cd frontend
```

#### Install dependencies
```bash
npm install
```

#### Start the development server
```bash
npm run dev
```

The frontend will start on **http://localhost:3000**

## Usage

### 1. Access the Application
Open your browser and navigate to **http://localhost:3000**

### 2. Create Admin Account
- Click "Sign Up"
- Fill in the registration form
- For admin access, you'll need to manually set the role to "ADMIN" in the database or use the API

### 3. Login
- Use your credentials to login
- Admin users will have access to product management and admin dashboard
- Customer users can browse products and place orders

### 4. Test the APIs
You can test the backend APIs directly:

#### Register a new admin user:
```bash
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
```

#### Login:
```bash
curl -X POST http://localhost:8081/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'
```

#### Create a product (requires admin token):
```bash
curl -X POST http://localhost:8081/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Sample Product",
    "description": "A sample product",
    "price": 29.99,
    "stockQuantity": 100,
    "category": "Electronics",
    "sku": "SAMPLE001"
  }'
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/me` - Get current user info

### Products
- `GET /api/products` - Get all active products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?name={name}` - Search products
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/{id}` - Update product (Admin only)
- `DELETE /api/products/{id}` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (Admin only)
- `GET /api/orders/my-orders` - Get user's orders
- `GET /api/orders/{id}` - Get order by ID
- `PUT /api/orders/{id}/status` - Update order status (Admin only)
- `PUT /api/orders/{id}/cancel` - Cancel order

### Admin
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/products/all` - Get all products (including inactive)

## Project Structure

```
Dropshipping order management/
├── backend/
│   ├── src/main/java/com/dropship/ordermanagement/
│   │   ├── config/          # Security and configuration
│   │   ├── controller/      # REST controllers
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── exception/      # Exception handling
│   │   ├── model/          # JPA entities
│   │   ├── repository/     # Data repositories
│   │   ├── security/       # JWT and security components
│   │   └── service/        # Business logic
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context (Auth)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Default Users

After starting the application, you can create users through the signup page or API. For testing purposes, create an admin user with the following credentials:

- **Username**: admin
- **Password**: password123
- **Role**: ADMIN

## Troubleshooting

### Backend Issues
1. **Port 8081 already in use**: Change the port in `application.properties`
2. **Database connection issues**: Ensure MySQL is running or use H2 (default)
3. **JWT token issues**: Check the JWT secret key length (must be >= 256 bits)

### Frontend Issues
1. **Port 3000 already in use**: The Vite dev server will automatically use the next available port
2. **API connection issues**: Ensure the backend is running on port 8081
3. **CORS issues**: CORS is configured in the backend for localhost:3000

### Common Issues
1. **Authentication not working**: Clear browser localStorage and try again
2. **Products not loading**: Check if the backend is running and accessible
3. **Orders not creating**: Ensure you're logged in and have products in cart

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
