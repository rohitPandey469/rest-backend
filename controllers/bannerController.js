const Banner = require("../models/Banner");

exports.getAllBanners = async (req, res) => {       
    try {
        const banners = await Banner.find({ active: true });
        res.json(banners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createBanner = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        const banner = new Banner({ title, imageUrl });
        await banner.save();
        res.status(201).json({ message: "Banner created successfully", banner });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl } = req.body;
        const banner = await Banner.findByIdAndUpdate(id, { title, imageUrl }, { new: true });
        if (!banner) {
            return res.status(404).json({ error: "Banner not found" });
        }
        res.json({ message: "Banner updated successfully", banner });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findByIdAndDelete(id);
        if (!banner) {
            return res.status(404).json({ error: "Banner not found" });
        }
        res.json({ message: "Banner deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBannerById = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findById(id);
        if (!banner) {
            return res.status(404).json({ error: "Banner not found" });
        }
        res.json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};