const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true, min: 1 },
  occasion: { type: String, default: "None" },
  specialRequests: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);