const pool = require('../utils/db');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

async function createUser(username, password, role = 'user') {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const [result] = await pool.execute(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, hashedPassword, role]
  );
  return result.insertId;
}

async function findUserByUsername(username) {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  return rows[0];
}

async function findUserById(id) {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
}

async function getAllUsers() {
  const [rows] = await pool.execute('SELECT id, username, role, created_at FROM users');
  return rows;
}

async function updateUserRole(id, role) {
  const [result] = await pool.execute(
    'UPDATE users SET role = ? WHERE id = ?',
    [role, id]
  );
  return result.affectedRows;
}

async function deleteUser(id) {
  const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows;
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  getAllUsers,
  updateUserRole,
  deleteUser
};
