const Reservation = require('../models/Reservation');

exports.getRecentReservations = async (req, res) => {
    let { lastNumHours, status } = req.query;
    lastNumHours = parseInt(lastNumHours, 10);

    try {
        // Calculate the date lastNumHours hours ago
        const lastNumHoursAgo = new Date();
        lastNumHoursAgo.setHours(lastNumHoursAgo.getHours() - lastNumHours);
        // Find reservations created within the last 24 hours
        const reservations = await Reservation.find({
            status: status || 'pending',
            createdAt: { $gte: lastNumHoursAgo }
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

exports.updateReservationStatus = async (req, res) => {
    try {
        const {reservationId, status} = req.body;

        // Validate status
        if (!['confirmed', 'cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const reservation = await Reservation.findByIdAndUpdate(
            reservationId,
            { status },
            { new: true }
        );

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        // Send email notification to the user
        // await sendEmailNotification(reservation.email, status);
        // For demonstration, we'll just log the email
        console.log(`Email sent to ${reservation.email} with status: ${status}`);
        res.status(200).json({ 
            message: 'Reservation status updated successfully',
            reservation 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteReservation = async (req, res) => {
    try {
        const { hours } = req.query;
        console.log("Hours", hours);
        const hoursAgo = parseInt(hours, 10);

        if (isNaN(hoursAgo) || hoursAgo <= 0) {
            return res.status(400).json({ error: 'Invalid hours parameter' });
        }

        if(hoursAgo < 24) {
            return res.status(200).json({ message: 'Reservations can only be deleted if they are older than 24 hours' });
        }   

        // Calculate the date hoursAgo hours ago
        const cutoffDate = new Date();
        cutoffDate.setHours(cutoffDate.getHours() - hoursAgo);

        // Delete all reservations created before the cutoff date
        const deletedReservations = await Reservation.deleteMany({
            createdAt: { $lt: cutoffDate }
        });

        if (deletedReservations.deletedCount === 0) {
            return res.status(404).json({ error: 'No reservations found before the given time' });
        }

        res.status(200).json({ 
            message: 'Reservations deleted successfully',
            deletedCount: deletedReservations.deletedCount
        });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}