const router = require('express').Router();

const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const { validationResult } = require('express-validator');
const validateOrder = [
  body('items').isArray().withMessage('Items must be an array'),
  body('items.*.menuItemId').isMongoId().withMessage('Invalid menu item ID'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  body('totalAmount').isFloat({ min: 0 }).withMessage('Total price must be a positive number'),
  body('customerName').trim().isLength({ min: 2, max: 100 }).escape(),
  body('customerEmail').isEmail().withMessage('Invalid email address'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.get('/', authMiddleware, orderController.getAllOrders);
router.get('/:orderId', authMiddleware, orderController.getOrderInfo);
router.post('/place', authMiddleware, validateOrder, orderController.placeOrder);
router.post('/update-status', authMiddleware, orderController.updateOrderStatus);

module.exports = router;