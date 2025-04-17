const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for menu import'))
  .catch(err => console.error('MongoDB connection error:', err));

const menuItems = [
  {
    name: "Bruschetta",
    description: "Toasted bread topped with fresh tomatoes, garlic, basil, and extra virgin olive oil",
    price: 750,
    category: "starters",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500",
    featured: true,
    dietary: ["vegetarian"]
  },
  {
    name: "Garlic Shrimp",
    description: "Sautéed jumbo shrimp with garlic, butter, white wine, and fresh herbs",
    price: 1080,
    category: "starters",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500",
    dietary: ["gluten-free"]
  },
  {
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon fillet with lemon herb sauce, roasted potatoes and seasonal vegetables",
    price: 2080,
    category: "main",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500",
    featured: true,
    dietary: ["gluten-free"]
  },
  {
    name: "Beef Tenderloin",
    description: "28-day aged beef tenderloin with red wine reduction, truffle mashed potatoes and glazed vegetables",
    price: 2490,
    category: "main",
    image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=500",
    featured: true
  },
  {
    name: "Wild Mushroom Risotto",
    description: "Creamy Arborio rice with wild mushrooms, white wine, shaved parmesan and fresh herbs",
    price: 1590,
    category: "main",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500",
    dietary: ["vegetarian"]
  },
  {
    name: "Classic Tiramisu",
    description: "Layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa powder",
    price: 830,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500",
    featured: true,
    dietary: ["vegetarian"]
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm dark chocolate cake with a molten center, served with vanilla bean ice cream and berry compote",
    price: 920,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
    dietary: ["vegetarian"]
  },
  {
    name: "Craft Beer Selection",
    description: "Rotating selection of local craft beers - ask your server for today's offerings",
    price: 660,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=500"
  },
  {
    name: "Premium Wine Flight",
    description: "Sampling of three premium wines - red, white, and rosé",
    price: 1320,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500",
    featured: true
  }
];

const importData = async () => {
  try {
    // Clear existing data
    await MenuItem.deleteMany({});
    
    // Import new data
    await MenuItem.insertMany(menuItems);
    
    console.log('Menu data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing menu data:', error);
    process.exit(1);
  }
};

importData();