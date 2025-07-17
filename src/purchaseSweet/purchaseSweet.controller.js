const Sweet = require('../models/sweet.model');

const purchaseSweet = async (req, res) => {
  if (req.headers.role !== 'user') {
    return res.status(403).send({ message: 'Access denied' });
  }

  try {
    const { sweetId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).send({ message: 'Invalid quantity value' });
    }

    const sweet = await Sweet.findOne({ sweetId: parseInt(sweetId) });

    if (!sweet) {
      return res.status(404).send({ message: 'Sweet not found' });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).send({ message: 'Insufficient stock' });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.status(200).send(sweet);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = purchaseSweet;
