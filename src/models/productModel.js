const db = require('../db');

const Product = {
  getAll: () => {
    return db.promise().query('SELECT * FROM products');
  },

  getById: (id) => {
    return db.promise().query('SELECT * FROM products WHERE id = ?', [id]);
  },

  create: (product) => {
    const { name, description, price } = product;
    return db.promise().query('INSERT INTO products (name, description, price) VALUES (?, ?, ?)', [name, description, price]);
  },

  update: (id, product) => {
    const { name, description, price } = product;
    return db.promise().query('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id]);
  },

  delete: (id) => {
    return db.promise().query('DELETE FROM products WHERE id = ?', [id]);
  }
};

module.exports = Product;
