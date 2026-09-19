const express = require('express');

const {
  getPacientes,
  getPacientesConSql,
  postPaciente,
  putPaciente,
  deletePaciente
} = require('../controllers/pacienteController');

const router = express.Router();

// Listado general y búsqueda opcional por nombre mediante Sequelize ORM.
router.get('/', getPacientes);

// Consulta alternativa utilizando SQL manual.
router.get('/sql', getPacientesConSql);

// Registro de un nuevo paciente.
router.post('/', postPaciente);

// Actualización de un paciente existente.
router.put('/:id', putPaciente);

// Eliminación de un paciente existente.
router.delete('/:id', deletePaciente);

module.exports = router;