# Brocker Frontend

A modern React-based frontend for the Brocker real estate platform, built with Tailwind CSS for beautiful, responsive design.

## Features

- **Modern UI/UX**: Built with Tailwind CSS for a clean, professional design
- **Responsive Design**: Fully responsive across all devices
- **Role-based Access**: Different interfaces for admins and regular users
- **Property Management**: View, add, edit, and delete properties (admin only)
- **Advanced Filtering**: Filter properties by type, price, location, and status
- **Image Gallery**: Interactive image carousel for property details
- **User Authentication**: Secure login/register with JWT
- **Profile Management**: Edit user profile information
- **Dashboard**: Overview of properties and user statistics

## Tech Stack

- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Axios**: HTTP client for API communication
- **React Icons**: Beautiful icon library
- **Context API**: State management for authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see Backend README)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
Frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Navigation component
│   │   ├── PrivateRoute.js    # Route protection for users
│   │   └── AdminRoute.js      # Route protection for admins
│   ├── contexts/
│   │   └── AuthContext.js     # Authentication context
│   ├── pages/
│   │   ├── Home.js            # Landing page
│   │   ├── Properties.js      # Property listing with filters
│   │   ├── PropertyDetail.js  # Detailed property view
│   │   ├── Login.js           # User login
│   │   ├── Register.js        # User registration
│   │   ├── Dashboard.js       # User dashboard
│   │   ├── AddProperty.js     # Add new property (admin)
│   │   ├── EditProperty.js    # Edit property (admin)
│   │   └── Profile.js         # User profile management
│   ├── App.js                 # Main app component
│   ├── App.css                # App-specific styles
│   ├── index.js               # App entry point
│   └── index.css              # Global styles and Tailwind imports
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── package.json
```

## Styling with Tailwind CSS

The application uses Tailwind CSS for styling, providing:

- **Utility-first approach**: Rapid development with utility classes
- **Responsive design**: Built-in responsive breakpoints
- **Custom theme**: Extended color palette with primary brand colors
- **Component classes**: Reusable component styles defined in `index.css`
- **Modern aesthetics**: Clean, professional design with smooth transitions

### Key Styling Features

- **Color Scheme**: Primary blue theme with semantic colors
- **Typography**: Consistent font hierarchy and spacing
- **Components**: Pre-styled buttons, forms, cards, and alerts
- **Animations**: Smooth hover effects and transitions
- **Layout**: Responsive grid system and flexbox utilities

## Demo Credentials

### Admin Account
- **Email**: admin@brocker.com
- **Password**: admin123

### Regular User Account
- **Email**: user@brocker.com
- **Password**: user123

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (not recommended)

## API Integration

The frontend communicates with the backend API through:

- **Base URL**: `http://localhost:5000` (configured via proxy)
- **Authentication**: JWT tokens stored in localStorage
- **Error Handling**: Centralized error handling with user-friendly messages
- **Loading States**: Loading indicators for better UX

## Key Features

### For All Users
- Browse properties with advanced filtering
- View detailed property information with image galleries
- User registration and authentication
- Profile management

### For Admins Only
- Add new properties with comprehensive forms
- Edit existing property details
- Delete properties
- View all properties in dashboard
- Manage property status (available, pending, sold)

## Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- **State Management**: Uses React Context for global state
- **Routing**: React Router v6 with protected routes
- **Forms**: Controlled components with validation
- **Images**: File upload support with preview
- **Error Boundaries**: Graceful error handling

## Deployment

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service

3. Ensure the backend API is accessible from your frontend domain

## Contributing

1. Follow the existing code style and Tailwind CSS patterns
2. Test responsive design across different screen sizes
3. Ensure all forms have proper validation
4. Maintain consistent component structure

## License

This project is part of the Brocker real estate platform. 