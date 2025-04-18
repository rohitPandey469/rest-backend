const mongoose = require('mongoose');
const Feedback = require('../models/Feedback');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected for menu import'))
    .catch(err => console.error('MongoDB connection error:', err));

const sampleReviews = [
    {
        name: "Rajesh Sharma",
        email : "rajesh@gmail.com",
        rating: 5,
        message: "The butter chicken was amazing! Authentic flavors and great service.",
    },
    {
        name: "Priya Patel",
        email : "priya@gmail.com",
        rating: 4,
        message: "Loved the ambiance and the food. The naan bread was particularly good.",
    },
    {
        name: "Arjun Singh",
        email : "arjun@gmail.com",
        rating: 5,
        message: "Best biryani in town! Will definitely be coming back.",
    },
    {
        name: "Meera Krishnan",
        email : "meera@gmail.com",
        rating: 3,
        message: "Good food but service was a bit slow during peak hours.",
    },
    {
        name: "Vikram Malhotra",
        email : "vikram@gmail.com",
        rating: 5,
        message: "The paneer tikka masala and garlic naan were exceptional. Great vegetarian options!",
    }
];

const importData = async () => {
    try {
        // Clear existing data
        await Feedback.deleteMany({});

        // Import new data
        await Feedback.insertMany(sampleReviews);

        console.log('Feedback Data imported successfully');
        process.exit();
    } catch (error) {
        console.error('Error importing feedback data:', error);
        process.exit(1);
    }
};

importData();