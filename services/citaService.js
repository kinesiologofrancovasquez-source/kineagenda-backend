const { Op } = require('sequelize');

const { Cita, Paciente } = require('../models');

// Obtiene todas las citas.
// Permite filtrar opcionalmente por estado.
const obtenerCitas = async (estado) => {
  const where = {};

  if (estado) {
    where.estado = {
      [Op.iLike]: estado
    };
  }

  return Cita.findAll({
    where,
    include: [
      {
        model: Paciente,
        as: 'paciente',
        attributes: ['id', 'nombre', 'apellido', 'email', 'telefono']
      }
    ],
    order: [
      ['fecha', 'ASC'],
      ['hora', 'ASC']
    ]
  });
};

// Obtiene una cita específica junto con su paciente.
const obtenerCitaPorId = async (id) => {
  return Cita.findByPk(id, {
    include: [
      {
        model: Paciente,
        as: 'paciente',
        attributes: ['id', 'nombre', 'apellido', 'email', 'telefono']
      }
    ]
  });
};

// Comprueba que el paciente exista antes de crear una cita.
const obtenerPacientePorId = async (pacienteId) => {
  return Paciente.findByPk(pacienteId);
};

// Registra una nueva cita.
const crearCita = async (datosCita) => {
  return Cita.create({
    fecha: datosCita.fecha,
    hora: datosCita.hora,
    motivo: datosCita.motivo,
    estado: datosCita.estado || 'pendiente',
    observaciones: datosCita.observaciones || null,
    pacienteId: datosCita.pacienteId
  });
};

// Actualiza únicamente los campos permitidos.
const actualizarCita = async (cita, datosCita) => {
  const camposPermitidos = [
    'fecha',
    'hora',
    'motivo',
    'estado',
    'observaciones',
    'pacienteId'
  ];

  const datosActualizados = {};

  camposPermitidos.forEach((campo) => {
    if (datosCita[campo] !== undefined) {
      datosActualizados[campo] = datosCita[campo];
    }
  });

  await cita.update(datosActualizados);

  return obtenerCitaPorId(cita.id);
};

// Elimina una cita existente.
const eliminarCita = async (cita) => {
  await cita.destroy();
};

module.exports = {
  obtenerCitas,
  obtenerCitaPorId,
  obtenerPacientePorId,
  crearCita,
  actualizarCita,
  eliminarCita
};