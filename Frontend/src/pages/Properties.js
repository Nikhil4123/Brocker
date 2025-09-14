import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaFilter, FaBed, FaBath, FaCar, FaTree } from 'react-icons/fa';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    city: '',
    status: ''
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      
      const response = await axios.get(`/api/properties?${params}`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      minPrice: '',
      maxPrice: '',
      city: '',
      status: ''
    });
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
    return <div className="loading">Loading properties...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Available Properties
      </h1>

      {/* Filters */}
      <div className="card mb-8">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
          <FaFilter className="text-primary-600" /> Filters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="form-group">
            <label>Property Type</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All Types</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
            </select>
          </div>

          <div className="form-group">
            <label>Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min Price"
            />
          </div>

          <div className="form-group">
            <label>Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max Price"
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              placeholder="Enter city"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          <div className="flex items-end">
            <button onClick={clearFilters} className="btn btn-secondary w-full">
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          <h3 className="text-2xl font-semibold mb-4">No properties found</h3>
          <p>Try adjusting your filters or check back later for new listings.</p>
        </div>
      ) : (
        <div className="property-grid">
          {properties.map(property => (
            <div key={property._id} className="property-card">
              <img
                src={property.images[0] || 'https://via.placeholder.com/400x200?text=No+Image'}
                alt={property.title}
                className="property-image"
              />
              <div className="property-content">
                <h3 className="property-title">{property.title}</h3>
                <div className="property-price">{formatPrice(property.price)}</div>
                <div className="property-location">
                  📍 {property.location.address}, {property.location.city}, {property.location.state}
                </div>
                
                <div className="property-features">
                  {property.type && (
                    <span className={`property-feature ${
                      property.type === 'residential' ? 'bg-blue-100 text-blue-800' : 
                      property.type === 'commercial' ? 'bg-purple-100 text-purple-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </span>
                  )}
                  {property.features.area && (
                    <span className="property-feature">
                      {property.features.area} sq ft
                    </span>
                  )}
                  {property.features.bedrooms > 0 && (
                    <span className="property-feature">
                      <FaBed className="inline mr-1" /> {property.features.bedrooms}
                    </span>
                  )}
                  {property.features.bathrooms > 0 && (
                    <span className="property-feature">
                      <FaBath className="inline mr-1" /> {property.features.bathrooms}
                    </span>
                  )}
                  {property.features.parking && (
                    <span className="property-feature">
                      <FaCar />
                    </span>
                  )}
                  {property.features.garden && (
                    <span className="property-feature">
                      <FaTree />
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <Link to={`/properties/${property._id}`} className="btn btn-primary w-full">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties; 