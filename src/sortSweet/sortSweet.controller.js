const Sweet = require('../models/sweet.model');

const sortSweet = async (req, res) => {
  try {
    const { by = 'price', order = 'asc' } = req.query;

    if (!['price', 'quantity'].includes(by)) {
      return res.status(400).send({ message: 'Invalid sort field' });
    }

    const sortOrder = order === 'desc' ? -1 : 1;

    const sweets = await Sweet.find().sort({ [by]: sortOrder });

    res.status(200).send(sweets);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = sortSweet;
