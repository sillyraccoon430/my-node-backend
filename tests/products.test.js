const request = require('supertest');
const app = require('../app');

describe('Products API', () => {
  let tokenAdmin;

  beforeAll(async () => {
    // Login si admin për të marrë token-in
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'admin123' });
    tokenAdmin = res.body.token;
  });

  test('GET /api/products pa token kthen 401', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/products me token admin kthen listë produktesh', async () => {
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/products me token admin krijon produkt të ri', async () => {
    const newProduct = {
      name: 'Produkt Test',
      description: 'Përshkrim test',
      price: 9.99
    };

    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(newProduct);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(newProduct.name);
  });

  test('PUT /api/products/:id me token admin përditëson produktin', async () => {
    // Së pari krijojmë produkt test për të përditësuar
    const createRes = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'Produkt Përditësim', description: 'Origjinal', price: 5.00 });
    const productId = createRes.body.id;

    // Pastaj e përditësojmë
    const updateData = { name: 'Produkt I Përditësuar', description: 'I përditësuar', price: 7.50 };
    const updateRes = await request(app)
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(updateData);

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.message).toMatch(/u përditësua/i);
  });

  test('DELETE /api/products/:id me token admin fshin produktin', async () => {
    // Së pari krijojmë produkt test për fshirje
    const createRes = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'Produkt Për Fshirje', description: 'Test', price: 1.00 });
    const productId = createRes.body.id;

    // Pastaj e fshijmë
    const deleteRes = await request(app)
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toMatch(/u fshi/i);
  });
});
