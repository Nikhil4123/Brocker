import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHome, FaBuilding, FaUser, FaSignOutAlt, FaPlus, FaCog } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-primary-600 transition-colors">
            🏠 Brocker
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
              <FaHome />
              <span>Home</span>
            </Link>
            
            <Link to="/properties" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
              <FaBuilding />
              <span>Properties</span>
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                  <FaCog />
                  <span>Dashboard</span>
                </Link>

                {isAdmin && (
                  <Link to="/add-property" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                    <FaPlus />
                    <span>Add Property</span>
                  </Link>
                )}

                <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                  <FaUser />
                  <span>{user.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 