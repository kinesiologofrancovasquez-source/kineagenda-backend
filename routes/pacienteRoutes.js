const express = require('express');

const {
  getPacientes,
  postPaciente,
  putPaciente,
  deletePaciente
} = require('../controllers/pacienteController');

const router = express.Router();

// Listado general y búsqueda opcional por nombre.
router.get('/', getPacientes);

// Registro de un nuevo paciente.
router.post('/', postPaciente);

// Actualización de un paciente existente.
router.put('/:id', putPaciente);

// Eliminación de un paciente existente.
router.delete('/:id', deletePaciente);

module.exports = router;