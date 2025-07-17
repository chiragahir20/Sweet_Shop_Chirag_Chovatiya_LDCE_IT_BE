const Sweet = require('../models/sweet.model');

const deleteSweet = async (req, res) => {
  if (req.headers.role !== 'admin') {
    return res.status(403).send({ message: 'Access denied' });
  }

  try {
    const { sweetId } = req.params;
    const deleted = await Sweet.findOneAndDelete({ sweetId: parseInt(sweetId) });

    if (!deleted) {
      return res.status(404).send({ message: 'Sweet not found' });
    }

    res.status(200).send({ message: 'Sweet deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = deleteSweet;
