const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Rruga nuk u gjet' });
});

module.exports = app;

