import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBuilding, FaMapMarkedAlt, FaHandshake } from 'react-icons/fa';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="hero-title">Find Your Dream Property</h1>
          <p className="hero-subtitle">Discover the perfect home, land, or commercial space with Brocker - your trusted real estate partner</p>
          <Link to="/properties" className="btn btn-primary text-lg px-8 py-4">
            Browse Properties
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="features-title">Why Choose Brocker?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaHome size={50} className="text-primary-600 mx-auto mb-6" />
              <h3>Residential Properties</h3>
              <p>Find your perfect home with our extensive collection of residential properties, from cozy apartments to luxurious villas.</p>
            </div>
            
            <div className="feature-card">
              <FaBuilding size={50} className="text-primary-600 mx-auto mb-6" />
              <h3>Commercial Spaces</h3>
              <p>Discover prime commercial real estate opportunities for your business growth and expansion needs.</p>
            </div>
            
            <div className="feature-card">
              <FaMapMarkedAlt size={50} className="text-primary-600 mx-auto mb-6" />
              <h3>Land Investment</h3>
              <p>Invest in valuable land plots with great potential for development and future appreciation.</p>
            </div>
            
            <div className="feature-card">
              <FaHandshake size={50} className="text-primary-600 mx-auto mb-6" />
              <h3>Expert Guidance</h3>
              <p>Get professional advice and support from our experienced real estate experts throughout your journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Start Your Search?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers who found their perfect property with Brocker
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties" className="btn btn-primary text-lg px-8 py-4">
              View All Properties
            </Link>
            <Link to="/register" className="btn btn-secondary text-lg px-8 py-4">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 