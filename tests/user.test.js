const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/utils/db');

beforeAll(async () => {
  // Krijo tabelën users nëse nuk ekziston
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE,
      password VARCHAR(255),
      role ENUM('admin', 'user') DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

afterAll(async () => {
  // Pastrimi dhe mbyllja e lidhjes me DB
  await pool.query('DROP TABLE IF EXISTS users');
  await pool.end();
});

describe('Testimi i User API', () => {
  it('Duhet të regjistrojë user të ri', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'testpass', role: 'user' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('userId');
  });

  it('Duhet të logojë user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
