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
    enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free'],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);