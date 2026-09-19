require('dotenv').config();

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('KineAgenda Backend funcionando correctamente');
});

app.listen(PORT, () => {
  console.log(`KineAgenda Backend ejecutándose en http://localhost:${PORT}`);
});
