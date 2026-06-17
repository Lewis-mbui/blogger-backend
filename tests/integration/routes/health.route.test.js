const request = require('supertest');
const mongoose = require('mongoose');
const connectDb = require('../../../startup/connectDb');
const app = require('../../../startup/app');

let server;

describe('GET /api/test', () => {
  it('should return a status check for the server', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
  })
});