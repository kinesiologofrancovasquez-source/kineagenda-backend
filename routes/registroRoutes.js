const express = require('express');

const {
  postRegistroCompleto
} = require('../controllers/registroController');

const router = express.Router();

// Registra un paciente y su primera cita mediante una transacción.
router.post('/', postRegistroCompleto);

module.exports = router;