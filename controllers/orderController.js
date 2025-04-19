const Order = require("../models/Orders");

exports.placeOrder = async (req, res) => {
    // Items will be an array with menu item IDs
    const { customerName, customerEmail, items, totalAmount, status} = req.body;
    console.log("Place Order Body: ", req.body);
    try {
        const order = new Order({
            customerName,
            customerEmail,
            items,
            totalAmount,
            status
        });
        await order.save();

        
        res.status(201).json({ message: "Order Placed successfully", order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .sort({ createdAt: -1 })
            .limit(10); // Limit to the latest 10 orders
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        // Validate status
        if (!['pending', 'paid'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json({ message: "Order status updated successfully", order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getOrderInfo = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate('items.menuItemId', 'name price description image');
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}