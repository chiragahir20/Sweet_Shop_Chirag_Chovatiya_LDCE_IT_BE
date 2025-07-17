const Sweet = require('../models/sweet.model');

const restockSweet = async (req, res) => {
  if (req.headers.role !== 'admin') {
    return res.status(403).send({ message: 'Access denied' });
  }

  try {
    const { sweetId } = req.params;
    const { quantity } = req.body;

    if (quantity == null || quantity <= 0) {
      return res.status(400).send({ message: 'Invalid quantity value' });
    }

    const updated = await Sweet.findOneAndUpdate(
      { sweetId: parseInt(sweetId) },
      { $inc: { quantity } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).send({ message: 'Sweet not found' });
    }

    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = restockSweet;
