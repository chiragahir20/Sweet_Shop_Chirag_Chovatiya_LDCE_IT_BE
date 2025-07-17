const Sweet = require('../models/sweet.model');

exports.addSweet = async (req, res) => {
  if (req.headers.role !== 'admin') {
    return res.status(403).send({ message: 'Access denied' });
  }
  try {
    const sweet = new Sweet(req.body);
    await sweet.save();
    res.status(201).send(sweet);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
