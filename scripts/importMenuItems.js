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
    dietary: ["vegetarian"],
    available: true
  },
  {
    name: "Garlic Shrimp",
    description: "Sautéed jumbo shrimp with garlic, butter, white wine, and fresh herbs",
    price: 1080,
    category: "starters",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500",
    dietary: ["gluten-free"],
    available: true
  },
  {
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon fillet with lemon herb sauce, roasted potatoes and seasonal vegetables",
    price: 2080,
    category: "main",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500",
    featured: true,
    dietary: ["gluten-free"],
    available: true
  },
  {
    name: "Beef Tenderloin",
    description: "28-day aged beef tenderloin with red wine reduction, truffle mashed potatoes and glazed vegetables",
    price: 2490,
    category: "main",
    image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=500",
    featured: true,
    available: true
  },
  {
    name: "Wild Mushroom Risotto",
    description: "Creamy Arborio rice with wild mushrooms, white wine, shaved parmesan and fresh herbs",
    price: 1590,
    category: "main",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500",
    dietary: ["vegetarian"],
    available: true
  },
  {
    name: "Classic Tiramisu",
    description: "Layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa powder",
    price: 830,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500",
    featured: true,
    dietary: ["vegetarian"],
    available: true
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm dark chocolate cake with a molten center, served with vanilla bean ice cream and berry compote",
    price: 920,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
    dietary: ["vegetarian"],
    available: true
  },
  {
    name: "Craft Beer Selection",
    description: "Rotating selection of local craft beers - ask your server for today's offerings",
    price: 660,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=500",
    available: true
  },
  {
    name: "Premium Wine Flight",
    description: "Sampling of three premium wines - red, white, and rosé",
    price: 1320,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500",
    featured: true,
    available: true
  },
  {
    name: "Truffle Mushroom Risotto",
    description: "Creamy Arborio rice slow-cooked with wild mushrooms and finished with black truffle oil and aged Parmesan",
    price: 1695,
    category: "main",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500",
    dietary: ["vegetarian"],
    available: false
  },
  {
    name: "Crispy Lotus Root Chips",
    description: "Thinly sliced lotus root fried to perfection, served with spicy aioli and microgreens",
    price: 850,
    category: "starters",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500",
    dietary: ["vegetarian"],
    available: false
  },
  {
    name: "Wagyu Beef Sliders",
    description: "Three mini A5 Wagyu beef burgers with caramelized onions, truffle aioli, and aged cheddar on brioche buns",
    price: 2499,
    category: "starters",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500",
    available: false
  },
  {
    name: "Miso Black Cod",
    description: "Alaskan black cod marinated for 72 hours in our house-made miso glaze, served with pickled daikon and steamed rice",
    price: 3250,
    category: "main",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500",
    available: false
  },
  {
    name: "Matcha Tiramisu",
    description: "Japanese twist on the classic Italian dessert with matcha-infused mascarpone and lady fingers",
    price: 995,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500",
    dietary: ["vegetarian"],
    available: false
  },
  {
    name: "Saffron Seafood Paella",
    description: "Traditional Spanish rice dish with saffron, shrimp, clams, mussels, and chorizo, cooked in a cast iron pan",
    price: 2895,
    category: "main",
    image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=500",
    available: false
  },
  {
    name: "Fig & Honey Cheesecake",
    description: "New York style cheesecake topped with fresh figs, honey drizzle, and candied walnuts",
    price: 1150,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
    dietary: ["vegetarian"],
    available: false
  },
  {
    name: "Korean Fried Cauliflower",
    description: "Crispy cauliflower florets tossed in a sweet and spicy Korean-inspired sauce, topped with sesame seeds and green onions",
    price: 1295,
    category: "starters",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500",
    dietary: ["vegetarian", "vegan"],
    available: false
  },
  {
    name: "Dry-Aged Duck Breast",
    description: "21-day dry-aged duck breast served medium rare with cherry gastrique, parsnip puree and wilted greens",
    price: 3400,
    category: "main",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500",
    available: false
  },
  {
    name: "Yuzu Passion Fruit Tart",
    description: "Buttery shortbread crust filled with yuzu and passion fruit curd, topped with Italian meringue",
    price: 1050,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500",
    dietary: ["vegetarian"],
    available: false
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