## Node.js REST API with CRUD Functionality
This project is a REST API built using Node.js and Express.js. It includes CRUD operations for users and products, as well as authentication using JWT. The project is modular, with a clean architecture separating routes, controllers, and middleware.

## Project Structure
bash
Copiar código
/controllers
    userController.js     # Logic for user CRUD
    productController.js  # Logic for product CRUD

/routes
    userRoutes.js         # Routes for user CRUD
    productRoutes.js      # Routes for product CRUD

/middleware
    authMiddleware.js     # JWT authentication middleware

app.js                   # Main entry point for the server
package.json             # Node.js dependencies and scripts
## Features

User Authentication: JWT-based authentication for secure access to protected routes.
User and Product CRUD: Create, Read, Update, and Delete operations for both users and products.
Security: Basic rate limiting and security headers using Helmet.
Cross-Origin Resource Sharing (CORS): Enabled to allow client requests from different domains.

## Endpoints

User Endpoints

GET /users: Retrieve all users (protected by JWT).

POST /users: Create a new user.

PUT /users/:id: Update an existing user (protected by JWT).

DELETE /users/:id: Delete a user (protected by JWT).

## Product Endpoints

GET /products: Retrieve all products (protected by JWT).

POST /products: Create a new product.

PUT /products/:id: Update an existing product (protected by JWT).

DELETE /products/:id: Delete a product (protected by JWT).

## Setup and Installation

Clone the repository:

git clone https://github.com/yourusername/api_nodejs_crud.git

cd api_nodejs_crud

Install dependencies:

npm install

Start the server:

npm start

The server will be running on http://localhost:3000.

Example .env File

You can configure the JWT secret and other settings using a .env file:

env

PORT=3000

JWT_SECRET=your_jwt_secret_key

Contributing

Feel free to submit a pull request to improve the project or add new features.

## License

This project is licensed under the MIT License.
