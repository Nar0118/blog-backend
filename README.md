# Blog Backend

## Description
This is the backend for a blog application, built using TypeScript, Node.js, and Express. It provides full CRUD (Create, Read, Update, Delete) functionality for blog posts and user authentication using JWT middleware. Prisma is used as the ORM to interact with the database.

## Technologies Used
- **Node.js** (Runtime environment)
- **Express.js** (Web framework)
- **TypeScript** (Type safety and development efficiency)
- **Prisma** (ORM for database management)
- **JWT (JSON Web Tokens)** (Authentication)
- **Middleware** (For request validation and authentication handling)
- **Dotenv** (Environment variable management)

## Features
- User authentication (Register, Login, Logout) with JWT
- Create, Read, Update, and Delete (CRUD) operations for blog posts
- Middleware for authentication and authorization
- Prisma ORM for database interactions
- Environment variable support with dotenv

## Installation
### Prerequisites
Make sure you have the following installed:
- **Node.js** (Latest LTS version recommended)
- **npm** or **yarn**
- **PostgreSQL** (or any database supported by Prisma)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/nar0118/blog-backend.git
   cd blog-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   DATABASE_URL="postgresql://blog:Kf3povrVEjeGKpDGXwHWZ0We0a7AuCMB@dpg-cve3h6hu0jms73bc9t5g-a.oregon-postgres.render.com/blog_7k1s"
   JWT_SECRET="eyJpZCI6MSwiaWF0IjoxNzQyMzc0MzI4LCJleHAiOjE3NDIzNzc5Mjh9"
   PORT=5000
   ```
4. Apply database migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints
### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login and receive a JWT token

### Blog Posts
- `GET /posts` - Get all blog posts
- `GET /post/:id` - Get a single post by ID
- `POST /posts` - Create a new post (Authenticated users only)
- `PUT /post/:id` - Update an existing post (Author only)
- `DELETE /post/:id` - Delete a post (Author only)

## Middleware
- **Auth Middleware**: Ensures only authenticated users can access certain routes.
- **Error Handling Middleware**: Centralized error handling for better debugging and API responses.

## Running in Production
To deploy the backend in a production environment:
- Use a process manager like **PM2** to keep the server running.
- Secure your environment variables.
- Optimize Prisma for production use.
- Set up a reverse proxy (e.g., Nginx) if necessary.

## Author
Developed by **Narek**. Contributions are welcome!

