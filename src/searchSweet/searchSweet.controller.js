const Sweet = require('../models/sweet.model');

const searchSweet = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // partial, case-insensitive
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.status(200).send(sweets);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = searchSweet;
