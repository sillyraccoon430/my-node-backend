const request = require('supertest');
const app = require('../app');

describe('Classes API', () => {
  let tokenAdmin;

  beforeAll(async () => {
    // Login si admin për të marrë token-in
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'admin123' });
    tokenAdmin = res.body.token;
  });

  test('GET /api/classes pa token kthen 401', async () => {
    const res = await request(app).get('/api/classes');
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/classes me token admin kthen listë klasash', async () => {
    const res = await request(app)
      .get('/api/classes')
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/classes me token admin krijon klasë të re', async () => {
    const newClass = {
      name: 'Klasa Test',
      description: 'Përshkrim klase test'
    };

    const res = await request(app)
      .post('/api/classes')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(newClass);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(newClass.name);
  });

  test('PUT /api/classes/:id me token admin përditëson klasën', async () => {
    // Së pari krijojmë klasë test për të përditësuar
    const createRes = await request(app)
      .post('/api/classes')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'Klasa Përditësim', description: 'Origjinal' });
    const classId = createRes.body.id;

    // Pastaj e përditësojmë
    const updateData = { name: 'Klasa e Përditësuar', description: 'I përditësuar' };
    const updateRes = await request(app)
      .put(`/api/classes/${classId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(updateData);

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.message).toMatch(/u përditësua/i);
  });

  test('DELETE /api/classes/:id me token admin fshin klasën', async () => {
    // Së pari krijojmë klasë test për fshirje
    const createRes = await request(app)
      .post('/api/classes')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'Klasa Për Fshirje', description: 'Test' });
    const classId = createRes.body.id;

    // Pastaj e fshijmë
    const deleteRes = await request(app)
      .delete(`/api/classes/${classId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toMatch(/u fshi/i);
  });
});
