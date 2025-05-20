const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);
const classRoutes = require('./routes/classes');
app.use('/api/classes', classRoutes);




app.use(express.json());
app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Rruga nuk u gjet' });
});

module.exports = app;

