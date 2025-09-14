const mongoose = require('mongoose');
const User = require('./models/User');
const Property = require('./models/Property');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/brocker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Property.deleteMany({});

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@brocker.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1234567890',
      address: '123 Admin Street, City, State 12345'
    });
    await admin.save();

    // Create regular user
    const user = new User({
      name: 'John Doe',
      email: 'user@brocker.com',
      password: 'user123',
      role: 'user',
      phone: '+1987654321',
      address: '456 User Avenue, City, State 12345'
    });
    await user.save();

    // Create sample properties
    const properties = [
      {
        title: 'Beautiful Residential Villa',
        description: 'A stunning 4-bedroom villa with modern amenities, located in a prime residential area. Features include a swimming pool, garden, and parking space.',
        type: 'residential',
        price: 750000,
        location: {
          address: '789 Luxury Lane',
          city: 'Beverly Hills',
          state: 'CA',
          zipCode: '90210'
        },
        features: {
          area: 3500,
          bedrooms: 4,
          bathrooms: 3,
          parking: true,
          garden: true
        },
        images: [
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
          'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
        ],
        status: 'available',
        contactInfo: {
          phone: '+1234567890',
          email: 'admin@brocker.com'
        },
        createdBy: admin._id
      },
      {
        title: 'Commercial Office Space',
        description: 'Prime commercial office space in downtown area. Perfect for businesses looking to establish a professional presence.',
        type: 'commercial',
        price: 1200000,
        location: {
          address: '321 Business Blvd',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001'
        },
        features: {
          area: 5000,
          bedrooms: 0,
          bathrooms: 2,
          parking: true,
          garden: false
        },
        images: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
        ],
        status: 'available',
        contactInfo: {
          phone: '+1234567890',
          email: 'admin@brocker.com'
        },
        createdBy: admin._id
      },
      {
        title: 'Large Land Plot for Development',
        description: 'Spacious land plot perfect for residential or commercial development. Located in a growing area with great potential.',
        type: 'land',
        price: 450000,
        location: {
          address: '555 Development Drive',
          city: 'San Diego',
          state: 'CA',
          zipCode: '92101'
        },
        features: {
          area: 10000,
          bedrooms: 0,
          bathrooms: 0,
          parking: false,
          garden: false
        },
        images: [
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
        ],
        status: 'available',
        contactInfo: {
          phone: '+1234567890',
          email: 'admin@brocker.com'
        },
        createdBy: admin._id
      },
      {
        title: 'Cozy Family Home',
        description: 'Perfect family home with 3 bedrooms, modern kitchen, and beautiful backyard. Located in a quiet neighborhood.',
        type: 'residential',
        price: 550000,
        location: {
          address: '123 Family Street',
          city: 'Irvine',
          state: 'CA',
          zipCode: '92602'
        },
        features: {
          area: 2200,
          bedrooms: 3,
          bathrooms: 2,
          parking: true,
          garden: true
        },
        images: [
          'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
          'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800'
        ],
        status: 'available',
        contactInfo: {
          phone: '+1234567890',
          email: 'admin@brocker.com'
        },
        createdBy: admin._id
      },
      {
        title: 'Retail Space in Shopping Center',
        description: 'High-traffic retail space in popular shopping center. Ideal for restaurants, retail stores, or service businesses.',
        type: 'commercial',
        price: 850000,
        location: {
          address: '777 Shopping Center Way',
          city: 'Anaheim',
          state: 'CA',
          zipCode: '92801'
        },
        features: {
          area: 3000,
          bedrooms: 0,
          bathrooms: 1,
          parking: true,
          garden: false
        },
        images: [
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
        ],
        status: 'available',
        contactInfo: {
          phone: '+1234567890',
          email: 'admin@brocker.com'
        },
        createdBy: admin._id
      }
    ];

    for (const propertyData of properties) {
      const property = new Property(propertyData);
      await property.save();
    }

    console.log('Database seeded successfully!');
    console.log('Admin credentials: admin@brocker.com / admin123');
    console.log('User credentials: user@brocker.com / user123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData(); 