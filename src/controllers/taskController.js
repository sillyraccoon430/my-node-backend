const Task = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
  try {
    const [rows] = await Task.getAll();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const [rows] = await Task.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ error: 'Detyra nuk u gjet' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const result = await Task.create(req.body);
    res.status(201).json({ id: result[0].insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const [rows] = await Task.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ error: 'Detyra nuk u gjet' });

    await Task.update(req.params.id, req.body);
    res.json({ message: 'Detyra u përditësua' });
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const [rows] = await Task.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ error: 'Detyra nuk u gjet' });

    await Task.delete(req.params.id);
    res.json({ message: 'Detyra u fshi' });
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};
