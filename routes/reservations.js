const express = require('express');
const { validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const { reservationLimiter } = require('../middleware/rateLimiter');
const { validateReservation } = require('../middleware/validators/reservationValidator');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

// Admin routes
router.get('/all', authMiddleware, reservationController.getRecentReservations);

// User Routes
router.post('/book', 
    reservationLimiter,
    validateReservation,
    // Check validation results
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    reservationController.createReservation
);

module.exports = router;