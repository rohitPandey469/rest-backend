const Banner = require("../models/Banner");

exports.getAllBanners = async (req, res) => {       
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getActiveBanners = async (req, res) => {
    try {
        const banners = await Banner.find({ active: true });
        res.json(banners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createBanner = async (req, res) => {
    try {
        const { title, image,  description, active  } = req.body;
        if (!title || !image || !description) {
            throw new Error("Title, image, and description are required");
        }
        const banner = new Banner({ title, image, description, active });
        await banner.save();
        res.status(201).json({ message: "Banner created successfully", banner });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, image, description, active } = req.body;
        const banner = await Banner.findByIdAndUpdate(id, { title, description, image, active }, { new: true });
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

exports.toggleBannerState = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findById(id);
        if (!banner) {
            return res.status(404).json({ error: "Banner not found" });
        }
        banner.active = !banner.active;
        await banner.save();
        res.json({ message: "Banner state toggled successfully", banner });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}