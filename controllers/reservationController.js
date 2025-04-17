const Reservation = require('../models/Reservation');

exports.getRecentReservations = async (req, res) => {
    try {
        // Calculate the date 24 hours ago
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        
        // Find reservations created within the last 24 hours
        const reservations = await Reservation.find({
            createdAt: { $gte: twentyFourHoursAgo }
        });
        
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createReservation = async (req, res) => {
    try {
        // Check for duplicate reservation
        const existingReservation = await Reservation.findOne({
            email: req.body.email,
            date: req.body.date,
            time: req.body.time
        });
        
        if (existingReservation) {
            return res.status(400).json({ 
                error: 'You already have a reservation at this date and time' 
            });
        }

        const reservation = new Reservation(req.body);
        await reservation.save();
        
        res.status(201).json({ 
            message: 'Reservation created successfully',
            reservation: {
                name: reservation.name,
                date: reservation.date,
                time: reservation.time,
                guests: reservation.guests,
                _id: reservation._id
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};