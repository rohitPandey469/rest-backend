const MenuItem = require('../models/MenuItem');

exports.getAllMenuItems = async (req, res) => {
  try {
    const { category, featured, dietary } = req.query;
    const filter = {};
    
    // Apply filters if provided
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (dietary) filter.dietary = dietary;
    
    const menuItems = await MenuItem.find(filter).sort({ category: 1, price: 1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableMenuItems = async (req, res) => {
  try {
    const availableItems = await MenuItem.find({ available: true });
    res.json(availableItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getComingSoonMenuItems = async (req, res) => {
  try {
    const comingSoonItems = await MenuItem.find({ available: false });
    res.json(comingSoonItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new menu item
exports.createMenuItem = async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json({ 
      message: 'Menu item created successfully',
      item: menuItem
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    
    res.json({ 
      message: 'Menu item updated successfully',
      item: menuItem
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get featured menu items
exports.getFeaturedItems = async (req, res) => {
  try {
    const featuredItems = await MenuItem.find({ featured: true, available: true });
    res.json(featuredItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get items by category
exports.getItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const items = await MenuItem.find({ category });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};