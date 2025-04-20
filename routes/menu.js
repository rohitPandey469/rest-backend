const express = require('express');
const { body } = require('express-validator');
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middleware/authMiddleware');
const { validationResult } = require('express-validator');

const router = express.Router();

// Validation middleware
const validateMenuItem = [
  body('name').trim().isLength({ min: 2, max: 100 }).escape(),
  body('description').trim().isLength({ min: 10, max: 500 }).escape(),
  body('price').isFloat({ min: 0 }),
  body('category').isIn(['starters', 'main', 'desserts', 'drinks', 'sides']),
  body('image').isURL(),
  body('featured').optional().isBoolean(),
  body('dietary').optional().isArray(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Public routes (no auth required)
router.get('/', menuController.getAllMenuItems);
router.get('/featured', menuController.getFeaturedItems);
router.get('/available', menuController.getAvailableMenuItems);
router.get('/coming-soon', menuController.getComingSoonMenuItems);
router.get('/category/:category', menuController.getItemsByCategory);
router.get('/:id', menuController.getMenuItemById);

// Admin routes (auth required)
router.post('/', authMiddleware, validateMenuItem, menuController.createMenuItem);
router.put('/:id', authMiddleware, validateMenuItem, menuController.updateMenuItem);
router.delete('/:id', authMiddleware, menuController.deleteMenuItem);

module.exports = router;