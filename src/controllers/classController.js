const Class = require('../models/classModel');

exports.getAllClasses = async (req, res) => {
  try {
    const [rows] = await Class.getAll();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const [rows] = await Class.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ error: 'Klasa nuk u gjet' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};

exports.createClass = async (req, res) => {
  try {
    const result = await Class.create(req.body);
    res.status(201).json({ id: result[0].insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const [rows] = await Class.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ error: 'Klasa nuk u gjet' });

    await Class.update(req.params.id, req.body);
    res.json({ message: 'Klasa u përditësua' });
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const [rows] = await Class.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ error: 'Klasa nuk u gjet' });

    await Class.delete(req.params.id);
    res.json({ message: 'Klasa u fshi' });
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};
