import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaBuilding, FaMapMarkerAlt, FaDollarSign, FaBed, FaBath, FaCar, FaTree } from 'react-icons/fa';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [property, setProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'residential',
    price: '',
    status: 'available',
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    features: {
      area: '',
      bedrooms: '',
      bathrooms: '',
      parking: false,
      garden: false,
      amenities: []
    },
    images: []
  });

  const [amenityInput, setAmenityInput] = useState('');

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/properties/${id}`);
      const propertyData = response.data;
      
      setProperty(propertyData);
      setFormData({
        title: propertyData.title || '',
        description: propertyData.description || '',
        type: propertyData.type || 'residential',
        price: propertyData.price || '',
        status: propertyData.status || 'available',
        location: {
          address: propertyData.location?.address || '',
          city: propertyData.location?.city || '',
          state: propertyData.location?.state || '',
          zipCode: propertyData.location?.zipCode || ''
        },
        features: {
          area: propertyData.features?.area || '',
          bedrooms: propertyData.features?.bedrooms || '',
          bathrooms: propertyData.features?.bathrooms || '',
          parking: propertyData.features?.parking || false,
          garden: propertyData.features?.garden || false,
          amenities: propertyData.features?.amenities || []
        },
        images: propertyData.images || []
      });
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addAmenity = () => {
    if (amenityInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: {
          ...prev.features,
          amenities: [...prev.features.amenities, amenityInput.trim()]
        }
      }));
      setAmenityInput('');
    }
  };

  const removeAmenity = (index) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        amenities: prev.features.amenities.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(`/api/properties/${id}`, formData);
      navigate(`/properties/${id}`);
    } catch (error) {
      console.error('Error updating property:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading property...</div>;
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you're trying to edit doesn't exist.</p>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <FaEdit className="text-primary-600" /> Edit Property
      </h1>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <FaBuilding className="text-primary-600" /> Basic Information
            </h3>

            <div className="form-group">
              <label>Property Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter property title"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Enter property description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label>Property Type</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="available">Available</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="flex items-center gap-2">
                <FaDollarSign className="text-primary-600" /> Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="Enter price"
              />
            </div>
          </div>

          {/* Location Information */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary-600" /> Location
            </h3>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="location.address"
                value={formData.location.address}
                onChange={handleChange}
                required
                placeholder="Enter street address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  required
                  placeholder="Enter city"
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleChange}
                  required
                  placeholder="Enter state"
                />
              </div>
            </div>

            <div className="form-group">
              <label>ZIP Code</label>
              <input
                type="text"
                name="location.zipCode"
                value={formData.location.zipCode}
                onChange={handleChange}
                placeholder="Enter ZIP code"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="card mt-8">
          <h3 className="text-xl font-semibold mb-6">Features & Amenities</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="form-group">
              <label className="flex items-center gap-2">
                <FaBuilding className="text-primary-600" /> Area (sq ft)
              </label>
              <input
                type="number"
                name="features.area"
                value={formData.features.area}
                onChange={handleChange}
                placeholder="Enter area"
              />
            </div>

            <div className="form-group">
              <label className="flex items-center gap-2">
                <FaBed className="text-primary-600" /> Bedrooms
              </label>
              <input
                type="number"
                name="features.bedrooms"
                value={formData.features.bedrooms}
                onChange={handleChange}
                placeholder="Number of bedrooms"
              />
            </div>

            <div className="form-group">
              <label className="flex items-center gap-2">
                <FaBath className="text-primary-600" /> Bathrooms
              </label>
              <input
                type="number"
                name="features.bathrooms"
                value={formData.features.bathrooms}
                onChange={handleChange}
                placeholder="Number of bathrooms"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="features.parking"
                checked={formData.features.parking}
                onChange={handleChange}
                id="parking"
              />
              <label htmlFor="parking" className="flex items-center gap-2 cursor-pointer">
                <FaCar className="text-primary-600" /> Parking Available
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="features.garden"
                checked={formData.features.garden}
                onChange={handleChange}
                id="garden"
              />
              <label htmlFor="garden" className="flex items-center gap-2 cursor-pointer">
                <FaTree className="text-primary-600" /> Garden
              </label>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <label className="block mb-3 font-semibold text-gray-700">Amenities</label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                placeholder="Add an amenity"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addAmenity}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>

            {formData.features.amenities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.features.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {amenity}
                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Images */}
        <div className="card mt-8">
          <h3 className="text-xl font-semibold mb-6">Property Images</h3>

          <div className="form-group">
            <label>Upload Additional Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Property ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2 flex-1"
            disabled={saving}
          >
            <FaEdit />
            {saving ? 'Saving Changes...' : 'Save Changes'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate(`/properties/${id}`)}
            className="btn btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProperty; 