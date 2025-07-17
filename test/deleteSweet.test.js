const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const connectDB = require('../src/db');
const Sweet = require('../src/models/sweet.model');

beforeAll(async () => {
  await connectDB();
  await Sweet.deleteMany({});

  // Add a sweet to delete
  await Sweet.create({
    sweetId: 3001,
    name: 'Rasgulla',
    category: 'Milk-Based',
    price: 25,
    quantity: 10,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Delete Sweet', () => {
  test('Admin can delete a sweet', async () => {
    const res = await request(app)
      .delete('/sweets/3001')
      .set('role', 'admin');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Sweet deleted successfully');
  });

  test('Cannot delete a non-existent sweet', async () => {
    const res = await request(app)
      .delete('/sweets/9999')
      .set('role', 'admin');

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Sweet not found');
  });

});
