const mongoose = require('mongoose');
const Banner = require('../models/Banner');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for menu import'))
  .catch(err => console.error('MongoDB connection error:', err));

const sampleBanners = [
  {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    title: "Welcome to Our Restaurant",
    description: "Experience the finest dining in town",
    active: true
  },
  {
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    title: "Try Our Special Menu",
    description: "Handcrafted dishes made with premium ingredients",
    active: true
  },
  {
    image: "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?q=80&w=1200&auto=format&fit=crop",
    title: "Book Your Table",
    description: "Reserve your spot for a memorable dining experience",
    active: true
  }
]

const importData = async () => {
  try {
    // Clear existing data
    await Banner.deleteMany({});
    
    // Import new data
    await Banner.insertMany(sampleBanners);
    
    console.log('Banners Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing Banners data:', error);
    process.exit(1);
  }
};

importData();