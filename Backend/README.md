# Brocker Backend

A Node.js/Express backend for the Brocker real estate website with user authentication and property management.

## Features

- User authentication (JWT)
- Role-based access control (Admin/User)
- Property CRUD operations
- Property filtering and search
- User management

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running on your system

3. Seed the database with sample data:
```bash
node seed.js
```

4. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Properties
- `GET /api/properties` - Get all properties (public)
- `GET /api/properties/:id` - Get single property (public)
- `POST /api/properties` - Create property (admin only)
- `PUT /api/properties/:id` - Update property (admin only)
- `DELETE /api/properties/:id` - Delete property (admin only)
- `GET /api/properties/type/:type` - Get properties by type

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `PUT /api/users/:id/role` - Change user role (admin only)

## Sample Credentials

After running the seed script:

**Admin:**
- Email: admin@brocker.com
- Password: admin123

**User:**
- Email: user@brocker.com
- Password: user123

## Environment Variables

Create a `.env` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/brocker
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
``` 