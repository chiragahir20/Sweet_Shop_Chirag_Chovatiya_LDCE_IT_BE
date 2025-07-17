const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const connectDB = require('../src/db');
const Sweet = require('../src/addSweet.model');

beforeAll(async () => {
  await connectDB();
  await Sweet.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('SweetShop - Add Sweet', () => {
  test('Admin can add a new sweet', async () => {
    const res = await request(app)
      .post('/sweets')
      .set('role', 'admin') 
      .send({
        sweetId: 1001,
        name: 'Kaju Katli',
        category: 'Nut-Based',
        price: 50,
        quantity: 20,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Kaju Katli');
  });

  test('Should throw error if sweetId already exists', async () => {
    const res = await request(app)
      .post('/sweets')
      .set('role', 'admin')
      .send({
        sweetId: 1001, 
        name: 'Duplicate Sweet',
        category: 'Milk-Based',
        price: 10,
        quantity: 5,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/duplicate key/i); 
  });
});
