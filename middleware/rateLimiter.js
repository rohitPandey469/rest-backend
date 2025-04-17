const rateLimit = require('express-rate-limit');

exports.reservationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 requests per hour
    message: { error: 'Too many reservation attempts, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});