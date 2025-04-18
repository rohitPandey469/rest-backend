const Feedback = require("../models/Feedback");

exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({}, 'name rating message createdAt')
            .sort({ createdAt: -1 })
            .limit(10); // Limit to the latest 10 feedbacks
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.createFeedback = async (req, res) => {
    try {
        const { name, email, rating, message } = req.body;
        const feedback = new Feedback({ name, email, rating, message });
        await feedback.save();
        res.status(201).json({ message: "Feedback created successfully", feedback });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};