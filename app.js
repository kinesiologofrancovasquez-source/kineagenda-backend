require('dotenv').config();

const express = require('express');
const mainRoutes = require('./routes/mainRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/', mainRoutes);

app.listen(PORT, () => {
  console.log(`KineAgenda Backend ejecutándose en http://localhost:${PORT}`);
});
