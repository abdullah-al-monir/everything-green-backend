# Everything Green - Backend API

A robust Node.js + Express + MongoDB backend API for the Everything Green application. This API handles user authentication, profile management, and provides a secure foundation for eco-friendly keyword tracking.

## 🚀 Features

- User Authentication: JWT-based authentication with secure password hashing
- Profile Management: Create, read, update, and delete user profiles
- Security: Helmet for HTTP headers, CORS protection, cookie-based authentication
- TypeScript: Full type safety and better developer experience
- MongoDB: Efficient document-based data storage with Mongoose ODM

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## 🛠️ Installation

1. Clone the repository
   bashgit clone <repository-url>
   cd everything-green-backend
2. Install dependencies

```bash
 npm install
```

3. Set up environment variables
   Create a .env file in the root directory by copying the example file:

```bash
cp .env.example .env
```

Edit the .env file with your configuration:

- env# Server Configuration
- NODE_ENV=development
- PORT=5000

### Database Configuration

- MONGO_URI=your_mongodb_uri

### JWT Configuration

- JWT_SECRET=your-super-secret-jwt-key
- JWT_EXPIRE=7d

### CORS Configuration

- CORS_ORIGIN=http://localhost:3000

## 🏃 Running the Application

1. Development Mode

- Run with hot-reload enabled:

```bash
npm run dev
```

The server will start at http://localhost:5000

## 📁 Project Structure

```
everything-green-backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.ts   # MongoDB connection
│   │   └── env.ts        # Environment variables
│   ├── controllers/      # Request handlers
│   │   ├── authController.ts
│   │   └── userController.ts
│   ├── middleware/       # Express middleware
│   │   ├── auth.ts       # Authentication middleware
│   │   └── errorHandler.ts
│   ├── models/           # Mongoose models
│   │   └── User.ts
│   ├── routes/           # API routes
│   │   ├── authRoutes.ts
│   │   └── userRoutes.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   └── jwt.ts        # JWT helpers
│   └── index.ts          # Application entry point
├── dist/                 # Compiled JavaScript (generated)
├── node_modules/         # Dependencies
├── .env                  # Environment variables (create this)
├── .env.example          # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json         # TypeScript configuration
└── README.md
```

## Test Link : https://everything-green-backend-eta.vercel.app/api/health
