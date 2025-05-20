const db = require('../db');

const Task = {
  getAll: () => db.promise().query('SELECT * FROM tasks'),
  getById: (id) => db.promise().query('SELECT * FROM tasks WHERE id = ?', [id]),
  create: (task) => {
    const { title, description, status, assigned_to } = task;
    return db.promise().query(
      'INSERT INTO tasks (title, description, status, assigned_to) VALUES (?, ?, ?, ?)',
      [title, description, status, assigned_to]
    );
  },
  update: (id, task) => {
    const { title, description, status, assigned_to } = task;
    return db.promise().query(
      'UPDATE tasks SET title = ?, description = ?, status = ?, assigned_to = ? WHERE id = ?',
      [title, description, status, assigned_to, id]
    );
  },
  delete: (id) => db.promise().query('DELETE FROM tasks WHERE id = ?', [id]),
};

module.exports = Task;
