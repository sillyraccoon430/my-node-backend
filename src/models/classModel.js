const db = require('../db');

const Class = {
  getAll: () => db.promise().query('SELECT * FROM classes'),
  getById: (id) => db.promise().query('SELECT * FROM classes WHERE id = ?', [id]),
  create: (cls) => {
    const { name, description } = cls;
    return db.promise().query(
      'INSERT INTO classes (name, description) VALUES (?, ?)',
      [name, description]
    );
  },
  update: (id, cls) => {
    const { name, description } = cls;
    return db.promise().query(
      'UPDATE classes SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
  },
  delete: (id) => db.promise().query('DELETE FROM classes WHERE id = ?', [id]),
};

module.exports = Class;
