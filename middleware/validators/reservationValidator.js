const { body } = require('express-validator');

exports.validateReservation = [
    body('name').trim().isLength({ min: 2, max: 50 }).escape()
        .withMessage('Name must be between 2-50 characters'),
    body('email').isEmail().normalizeEmail()
        .withMessage('Valid email is required'),
    body('phone').matches(/^[0-9+\s()-]{7,15}$/)
        .withMessage('Invalid phone format'),
    body('date').isDate()
        .withMessage('Invalid date format'),
    body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage('Invalid time format (HH:MM)'),
    body('guests').isInt({ min: 1, max: 20 })
        .withMessage('Guest count must be between 1 and 20'),
    body('occasion').optional().trim().isLength({ max: 50 }).escape(),
    body('specialRequests').optional().trim().isLength({ max: 500 }).escape(),
];