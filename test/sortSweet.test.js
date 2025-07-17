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

  await Sweet.insertMany([
    { sweetId: 6001, name: 'Sweet A', category: 'Type 1', price: 10, quantity: 100 },
    { sweetId: 6002, name: 'Sweet B', category: 'Type 2', price: 30, quantity: 50 },
    { sweetId: 6003, name: 'Sweet C', category: 'Type 3', price: 20, quantity: 200 },
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Sort Sweets (User/Admin)', () => {
  test('Sort by price ascending', async () => {
    const res = await request(app)
      .get('/sweets/sort?by=price&order=asc')
      .set('role', 'user');

    expect(res.statusCode).toBe(200);
    expect(res.body[0].price).toBe(10);
    expect(res.body[1].price).toBe(20);
    expect(res.body[2].price).toBe(30);
  });

  test('Sort by quantity descending', async () => {
    const res = await request(app)
      .get('/sweets/sort?by=quantity&order=desc')
      .set('role', 'admin');

    expect(res.statusCode).toBe(200);
    expect(res.body[0].quantity).toBe(200);
    expect(res.body[1].quantity).toBe(100);
    expect(res.body[2].quantity).toBe(50);
  });

  test('Invalid sort field', async () => {
    const res = await request(app)
      .get('/sweets/sort?by=invalid')
      .set('role', 'user');

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid sort field');
  });
});
