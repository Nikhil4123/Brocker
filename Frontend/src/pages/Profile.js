import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await updateProfile(formData);
    if (result.success) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <FaUser className="text-primary-600" /> My Profile
        </h1>

        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary flex items-center gap-2"
              >
                <FaEdit /> Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="flex items-center gap-2">
                  <FaUser className="text-primary-600" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="flex items-center gap-2">
                  <FaEnvelope className="text-primary-600" /> Email Address
                </label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
                <small className="text-gray-600">Email cannot be changed</small>
              </div>

              <div className="form-group">
                <label className="flex items-center gap-2">
                  <FaPhone className="text-primary-600" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary-600" /> Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your address"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="btn btn-primary flex items-center gap-2 flex-1"
                  disabled={loading}
                >
                  <FaSave />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="font-semibold text-gray-800">Full Name</label>
                <p className="text-gray-600 mt-1">{user?.name}</p>
              </div>

              <div>
                <label className="font-semibold text-gray-800">Email Address</label>
                <p className="text-gray-600 mt-1">{user?.email}</p>
              </div>

              <div>
                <label className="font-semibold text-gray-800">Phone Number</label>
                <p className="text-gray-600 mt-1">
                  {user?.phone || 'Not provided'}
                </p>
              </div>

              <div>
                <label className="font-semibold text-gray-800">Address</label>
                <p className="text-gray-600 mt-1">
                  {user?.address || 'Not provided'}
                </p>
              </div>

              <div>
                <label className="font-semibold text-gray-800">Account Type</label>
                <p className="mt-1">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user?.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {user?.role === 'admin' ? 'Administrator' : 'Regular User'}
                  </span>
                </p>
              </div>

              <div>
                <label className="font-semibold text-gray-800">Member Since</label>
                <p className="text-gray-600 mt-1">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 