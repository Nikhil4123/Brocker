# 🏠 Brocker - Real Estate Website

A full-stack MERN (MongoDB, Express.js, React, Node.js) real estate website with role-based access control for admins and users.

## 🌟 Features

### For Admins
- **Property Management**: Add, edit, and delete properties
- **User Management**: View and manage user accounts
- **Dashboard**: Comprehensive statistics and overview
- **Full CRUD Operations**: Complete control over property listings

### For 



- **Property Browsing**: View all available properties
- **Advanced Filtering**: Filter by type, price, location, and status
- **Property Details**: Comprehensive property information with image galleries
- **Profile Management**: Update personal information
- **Responsive Design**: Works on all devices

### General Features
- **Authentication**: Secure login/register system with JWT
- **Role-based Access**: Different permissions for admins and users
- **Modern UI**: Beautiful, responsive design
- **Image Galleries**: Multiple images per property
- **Search & Filter**: Advanced property search functionality

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Brocker
   ```

2. **Set up the Backend**
   ```bash
   cd Backend
   npm install
   ```

3. **Set up the Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or update the connection string in the backend.

5. **Seed the Database**
   ```bash
   cd ../Backend
   node seed.js
   ```

6. **Start the Servers**

   **Backend (Terminal 1):**
   ```bash
   cd Backend
   npm run dev
   ```
   Server will run on `http://localhost:5000`

   **Frontend (Terminal 2):**
   ```bash
   cd Frontend
   npm start
   ```
   App will run on `http://localhost:3000`

## 📋 Demo Credentials

After running the seed script, you can use these credentials:

### Admin Account
- **Email**: admin@brocker.com
- **Password**: admin123

### User Account
- **Email**: user@brocker.com
- **Password**: user123

## 🏗️ Project Structure

```
Brocker/
├── Backend/                 # Node.js/Express API
│   ├── config/             # Database configuration
│   ├── middleware/         # Authentication middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   ├── seed.js             # Database seeder
│   └── package.json        # Backend dependencies
├── Frontend/               # React application
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Properties
- `GET /api/properties` - Get all properties (public)
- `GET /api/properties/:id` - Get single property (public)
- `POST /api/properties` - Create property (admin only)
- `PUT /api/properties/:id` - Update property (admin only)
- `DELETE /api/properties/:id` - Delete property (admin only)

### 



- `GET /api/users` - Get all users (admin only)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🎨 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS3** - Styling

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for password security
- **Role-based Access Control** - Different permissions for different user types
- **Input Validation** - Server-side validation for all inputs
- **CORS Protection** - Cross-origin request protection

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables
2. Deploy to platforms like Heroku, Railway, or DigitalOcean
3. Configure MongoDB connection

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages
3. Update API endpoints to production URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the documentation
2. Review the console for error messages
3. Ensure all dependencies are installed
4. Verify MongoDB is running

## 🎯 Future Enhancements

- [ ] Email notifications
- [ ] Property favorites
- [ ] Advanced search filters
- [ ] Property reviews and ratings
- [ ] Image upload functionality
- [ ] Payment integration
- [ ] Mobile app development
- [ ] Multi-language support

---

**Happy coding! 🎉** 