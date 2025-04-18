const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const bannerController = require('../controllers/bannerController');
const router = express.Router();

router.get('/', bannerController.getAllBanners);
router.get('/:id', bannerController.getBannerById);
router.post('/', authMiddleware, bannerController.createBanner);
router.put('/:id', authMiddleware, bannerController.updateBanner);
router.delete('/:id', authMiddleware, bannerController.deleteBanner);

module.exports = router;