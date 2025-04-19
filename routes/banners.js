const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const bannerController = require('../controllers/bannerController');
const router = express.Router();

router.get('/', bannerController.getAllBanners);
router.get('/active', bannerController.getActiveBanners);
router.get('/:id', bannerController.getBannerById);
router.post('/', authMiddleware, bannerController.createBanner);
router.patch("/toggle/:id", authMiddleware, bannerController.toggleBannerState);
router.put('/:id', authMiddleware, bannerController.updateBanner);
router.delete('/:id', authMiddleware, bannerController.deleteBanner);

module.exports = router;