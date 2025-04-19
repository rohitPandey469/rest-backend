const mongoose = require('mongoose');
const Order = require('../models/Orders');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for menu import'))
  .catch(err => console.error('MongoDB connection error:', err));

const sampleOrders = [
    {
        customerName: "John Doe",
        customerEmail: "john@gmail.com",
        items: [
            { menuItemId: "60d5f484f1a2c8b8b8b8b8b8", quantity: 2 },
            { menuItemId: "60d5f484f1a2c8b8b8b8b8b9", quantity: 1 }
        ],
        totalAmount: 50.00,
    }
]

const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany({});
    
    // Import new data
    await Order.insertMany(sampleOrders);
    
    console.log('Orders Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing Orders data:', error);
    process.exit(1);
  }
};

importData();