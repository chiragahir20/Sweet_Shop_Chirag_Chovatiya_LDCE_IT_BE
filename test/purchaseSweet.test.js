const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const connectDB = require('../src/db');
const Sweet = require('../src/models/sweet.model');

jest.setTimeout(15000);

beforeAll(async () => {
  await connectDB();
  await mongoose.connection.db.dropCollection('sweets').catch(() => {});
  await Sweet.deleteMany({});

  await Sweet.create({
    sweetId: 7001,
    name: 'Barfi',
    category: 'Milk-Based',
    price: 25,
    quantity: 20,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Purchase Sweet (User Only)', () => {
  test('User can purchase sweet if enough stock', async () => {
    const res = await request(app)
      .put('/sweets/7001/purchase')
      .set('role', 'user')
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(15); // 20 - 5
  });

  test('User cannot purchase sweet if not enough stock', async () => {
    const res = await request(app)
      .put('/sweets/7001/purchase')
      .set('role', 'user')
      .send({ quantity: 100 }); // more than available

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Insufficient stock');
  });

  test('User cannot send invalid quantity', async () => {
    const res = await request(app)
      .put('/sweets/7001/purchase')
      .set('role', 'user')
      .send({ quantity: -5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid quantity value');
  });

  test('Admin cannot purchase sweet', async () => {
    const res = await request(app)
      .put('/sweets/7001/purchase')
      .set('role', 'admin')
      .send({ quantity: 2 });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Access denied');
  });
});
