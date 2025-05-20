const request = require('supertest');
const app = require('../app');

describe('Tasks API', () => {
  let tokenAdmin;

  beforeAll(async () => {
    // Login si admin për të marrë token-in
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'admin123' });
    tokenAdmin = res.body.token;
  });

  test('GET /api/tasks pa token kthen 401', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/tasks me token admin kthen listë detyrash', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/tasks me token admin krijon detyrë të re', async () => {
    const newTask = {
      title: 'Detyra Test',
      description: 'Përshkrim detyre test',
      status: 'pending',
      assigned_to: null
    };

    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(newTask);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newTask.title);
  });

  test('PUT /api/tasks/:id me token admin përditëson detyrën', async () => {
    // Së pari krijojmë detyrë test për të përditësuar
    const createRes = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ title: 'Detyra Përditësim', description: 'Origjinal', status: 'pending', assigned_to: null });
    const taskId = createRes.body.id;

    // Pastaj e përditësojmë
    const updateData = { title: 'Detyra e Përditësuar', description: 'I përditësuar', status: 'in_progress', assigned_to: null };
    const updateRes = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(updateData);

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.message).toMatch(/u përditësua/i);
  });

  test('DELETE /api/tasks/:id me token admin fshin detyrën', async () => {
    // Së pari krijojmë detyrë test për fshirje
    const createRes = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ title: 'Detyra Për Fshirje', description: 'Test', status: 'pending', assigned_to: null });
    const taskId = createRes.body.id;

    // Pastaj e fshijmë
    const deleteRes = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toMatch(/u fshi/i);
  });
});
