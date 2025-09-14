import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaEye, FaBuilding, FaUsers, FaDollarSign } from 'react-icons/fa';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    availableProperties: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch properties
      const propertiesResponse = await axios.get('/api/properties');
      setProperties(propertiesResponse.data.slice(0, 5)); // Show only 5 recent properties
      
      // Calculate stats
      const totalProperties = propertiesResponse.data.length;
      const availableProperties = propertiesResponse.data.filter(p => p.status === 'available').length;
      
      setStats({
        totalProperties,
        availableProperties,
        totalUsers: isAdmin ? 0 : 'N/A' // Only admin can see user count
      });
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`/api/properties/${propertyId}`);
        fetchDashboardData(); // Refresh data
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome back, {user?.name}! 👋
      </h1>

      {/* Stats Cards */}
      <div className="dashboard-grid">
        <div className="stats-card">
          <div className="stats-number">{stats.totalProperties}</div>
          <div className="stats-label">Total Properties</div>
        </div>
        <div className="stats-card">
          <div className="stats-number">{stats.availableProperties}</div>
          <div className="stats-label">Available Properties</div>
        </div>
        {isAdmin && (
          <div className="stats-card">
            <div className="stats-number">{stats.totalUsers}</div>
            <div className="stats-label">Total Users</div>
          </div>
        )}
      </div>

      {/* Admin Actions */}
      {isAdmin && (
        <div className="card mt-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <FaPlus className="text-primary-600" /> Quick Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/add-property" className="btn btn-primary flex items-center gap-2">
              <FaPlus /> Add New Property
            </Link>
            <Link to="/properties" className="btn btn-secondary flex items-center gap-2">
              <FaBuilding /> Manage Properties
            </Link>
          </div>
        </div>
      )}

      {/* Recent Properties */}
      <div className="card mt-8">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
          <FaBuilding className="text-primary-600" /> Recent Properties
        </h3>
        
        {properties.length === 0 ? (
          <p className="text-center text-gray-600 py-8">
            No properties found. {isAdmin && 'Add your first property to get started!'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-3 font-semibold text-gray-700">Property</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Price</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(property => (
                  <tr key={property._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-semibold text-gray-800">{property.title}</div>
                        <div className="text-sm text-gray-600">
                          {property.location.city}, {property.location.state}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        property.type === 'residential' ? 'bg-blue-100 text-blue-800' : 
                        property.type === 'commercial' ? 'bg-purple-100 text-purple-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-primary-600">
                      {formatPrice(property.price)}
                    </td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        property.status === 'available' ? 'bg-green-100 text-green-800' : 
                        property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Link 
                          to={`/properties/${property._id}`}
                          className="btn btn-secondary text-xs px-3 py-1"
                        >
                          <FaEye />
                        </Link>
                        {isAdmin && (
                          <>
                            <Link 
                              to={`/edit-property/${property._id}`}
                              className="btn btn-primary text-xs px-3 py-1"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => handleDeleteProperty(property._id)}
                              className="btn btn-danger text-xs px-3 py-1"
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="text-center mt-6">
          <Link to="/properties" className="btn btn-primary">
            View All Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 