const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await Product.getAll();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const [rows] = await Product.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ error: 'Produkti nuk u gjet' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const result = await Product.create(req.body);
    res.status(201).json({ id: result[0].insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const [rows] = await Product.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ error: 'Produkti nuk u gjet' });

    await Product.update(req.params.id, req.body);
    res.json({ message: 'Produkti u përditësua' });
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const [rows] = await Product.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ error: 'Produkti nuk u gjet' });

    await Product.delete(req.params.id);
    res.json({ message: 'Produkti u fshi' });
  } catch (error) {
    res.status(500).json({ error: 'Gabim në server' });
  }
};
