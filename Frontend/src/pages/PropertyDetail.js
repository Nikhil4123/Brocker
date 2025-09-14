import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FaBed, FaBath, FaCar, FaTree, FaMapMarkerAlt, FaPhone, FaEnvelope, FaEdit, FaTrash } from 'react-icons/fa';

const PropertyDetail = () => {
  const { id } = useParams();
  const { user, isAdmin } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/properties/${id}`);
      setProperty(response.data);
    } catch (error) {
      setError('Property not found');
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async () => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`/api/properties/${id}`);
        // Redirect to properties page
        window.location.href = '/properties';
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  if (loading) {
    return <div className="loading">Loading property details...</div>;
  }

  if (error || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/properties" className="btn btn-primary">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
          <li>/</li>
          <li><Link to="/properties" className="hover:text-primary-600">Properties</Link></li>
          <li>/</li>
          <li className="text-gray-800">{property.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="card p-0 overflow-hidden mb-8">
            <div className="relative">
              <img
                src={property.images[currentImageIndex] || 'https://via.placeholder.com/800x400?text=No+Image'}
                alt={property.title}
                className="w-full h-96 object-cover"
              />
              
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                  >
                    →
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </>
              )}
            </div>
            
            {/* Thumbnail Navigation */}
            {property.images.length > 1 && (
              <div className="p-4 flex gap-2 overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-primary-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="card">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{property.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt className="text-primary-600" />
                <span>{property.location.address}, {property.location.city}, {property.location.state}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {property.features.bedrooms > 0 && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaBed className="text-primary-600 mx-auto mb-2 text-xl" />
                  <div className="font-semibold">{property.features.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
              )}
              
              {property.features.bathrooms > 0 && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaBath className="text-primary-600 mx-auto mb-2 text-xl" />
                  <div className="font-semibold">{property.features.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
              )}
              
              {property.features.area && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaBuilding className="text-primary-600 mx-auto mb-2 text-xl" />
                  <div className="font-semibold">{property.features.area}</div>
                  <div className="text-sm text-gray-600">sq ft</div>
                </div>
              )}
              
              {property.features.parking && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaCar className="text-primary-600 mx-auto mb-2 text-xl" />
                  <div className="font-semibold">Yes</div>
                  <div className="text-sm text-gray-600">Parking</div>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {property.features.amenities && property.features.amenities.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {property.features.amenities.map((amenity, index) => (
                    <span key={index} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-8">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {formatPrice(property.price)}
              </div>
              <div className="text-gray-600">Price</div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Property Type</span>
                <span className="font-semibold capitalize">{property.type}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  property.status === 'available' ? 'bg-green-100 text-green-800' : 
                  property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Listed</span>
                <span className="font-semibold">
                  {new Date(property.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="btn btn-primary w-full">
                Contact Agent
              </button>
              <button className="btn btn-secondary w-full">
                Schedule Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail; 