const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const connectDB = require('../src/db');
const Sweet = require('../src/models/sweet.model');

beforeAll(async () => {
  await connectDB();
  await Sweet.deleteMany({});

  await Sweet.insertMany([
    {
      sweetId: 5001,
      name: 'Chocolate Bar',
      category: 'Chocolate',
      price: 20,
      quantity: 30,
    },
    {
      sweetId: 5002,
      name: 'Milk Cake',
      category: 'Milk-Based',
      price: 35,
      quantity: 40,
    },
    {
      sweetId: 5003,
      name: 'Candy Cane',
      category: 'Candy',
      price: 10,
      quantity: 100,
    },
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Search Sweets (User/Admin)', () => {
  test('Search by name (partial, case-insensitive)', async () => {
    const res = await request(app)
      .get('/sweets/search?name=choco')
      .set('role', 'user');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Chocolate Bar');
  });

  test('Search by category', async () => {
    const res = await request(app)
      .get('/sweets/search?category=Milk-Based')
      .set('role', 'user');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Milk Cake');
  });

  test('Search by price range', async () => {
    const res = await request(app)
      .get('/sweets/search?minPrice=15&maxPrice=30')
      .set('role', 'user');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Chocolate Bar');
  });

  test('Search with no filters returns all', async () => {
    const res = await request(app)
      .get('/sweets/search')
      .set('role', 'user');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(3);
  });
});
