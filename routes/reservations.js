const express = require('express');
const Reservation = require('../models/Reservation');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all reservations for the last 24 hours
router.get('/all', async (req, res) => {
    try {
        // Calculate the date 24 hours ago
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        
        // Find reservations created within the last 24 hours
        const reservations = await Reservation.find({
            createdAt: { $gte: twentyFourHoursAgo }
        });
        
        res.json(reservations);
        console.log(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Make a reservation
router.post('/book', async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;