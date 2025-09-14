const express = require('express');
const Property = require('../models/Property');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all properties (public)
router.get('/', async (req, res) => {
  try {
    const { type, minPrice, maxPrice, city, status } = req.query;
    let filter = {};

    if (type) filter.type = type;
    if (status) filter.status = status;
    if (city) filter['location.city'] = { $regex: city, $options: 'i' };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single property (public)
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('createdBy', 'name email phone');
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create property (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      createdBy: req.user._id
    });

    await property.save();
    await property.populate('createdBy', 'name email');

    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update property (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete property (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get properties by type
router.get('/type/:type', async (req, res) => {
  try {
    const properties = await Property.find({ type: req.params.type })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 