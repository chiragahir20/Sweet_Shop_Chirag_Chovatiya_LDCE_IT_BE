const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const connectDB = require('../src/db');
const Sweet = require('../src/models/sweet.model');

beforeAll(async () => {
  await connectDB();
  await Sweet.deleteMany({});

  // Insert sweet to restock
  await Sweet.create({
    sweetId: 4001,
    name: 'Ladoo',
    category: 'Gram-Based',
    price: 20,
    quantity: 5,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Restock Sweet (Admin Only)', () => {
  test('Admin can restock a sweet', async () => {
    const res = await request(app)
      .put('/sweets/4001/restock')
      .set('role', 'admin')
      .send({ quantity: 10 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(15); // 5 + 10
  });

  test('Admin cannot restock non-existent sweet', async () => {
    const res = await request(app)
      .put('/sweets/9999/restock')
      .set('role', 'admin')
      .send({ quantity: 10 });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Sweet not found');
  });

  test('User cannot restock any sweet', async () => {
    const res = await request(app)
      .put('/sweets/4001/restock')
      .set('role', 'user')
      .send({ quantity: 10 });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Access denied');
  });

  test('Invalid quantity input should fail', async () => {
    const res = await request(app)
      .put('/sweets/4001/restock')
      .set('role', 'admin')
      .send({ quantity: -5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid quantity value');
  });
});
