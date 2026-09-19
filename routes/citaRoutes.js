const express = require('express');

const {
  getCitas,
  getCitaPorId,
  postCita,
  putCita,
  deleteCita
} = require('../controllers/citaController');

const router = express.Router();

// Listado de citas y filtro opcional por estado.
router.get('/', getCitas);

// Obtiene una cita específica.
router.get('/:id', getCitaPorId);

// Registra una nueva cita.
router.post('/', postCita);

// Actualiza una cita existente.
router.put('/:id', putCita);

// Elimina una cita existente.
router.delete('/:id', deleteCita);

module.exports = router;