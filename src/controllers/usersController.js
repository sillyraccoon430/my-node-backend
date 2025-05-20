const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

async function register(req, res) {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username dhe password janë të detyrueshëm' });
    }
    const existingUser = await userModel.findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username ekziston' });
    }
    const userId = await userModel.createUser(username, password, role);
    res.status(201).json({ message: 'User u krijua', userId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userModel.findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Kredencialet janë gabim' });
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ message: 'Kredencialet janë gabim' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateRole(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Roli i pavlefshëm' });
    }
    const updated = await userModel.updateUserRole(id, role);
    if (updated) {
      res.json({ message: 'Roli u përditësua' });
    } else {
      res.status(404).json({ message: 'User nuk u gjet' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deleted = await userModel.deleteUser(id);
    if (deleted) {
      res.json({ message: 'User u fshi' });
    } else {
      res.status(404).json({ message: 'User nuk u gjet' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
  getUsers,
  getAllUsers: getUsers,      // alias për router.get('/', ...)
  getUserById: async (req, res) => {
    // Mund të implementosh këtë sipas nevojës
    try {
      const user = await userModel.findUserById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User nuk u gjet' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateUser: updateRole,     // alias për router.put('/:id', ...)
  updateRole,
  deleteUser
};
