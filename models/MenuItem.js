const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['starters', 'main', 'desserts', 'drinks', 'sides']
  },
  image: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  dietary: {
    type: [String],
    enum: [
      'vegetarian',
      'vegan',
      'non-vegetarian',
      'eggetarian',
      'pescatarian',
      'gluten-free',
      'dairy-free',
      'nut-free',
      'egg-free',
      'halal',
      'kosher',
      'keto',
      'paleo',
      'low-carb'
    ],
    default: []
  },
  available: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);