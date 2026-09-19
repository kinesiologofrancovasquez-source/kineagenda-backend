const { Op, QueryTypes } = require('sequelize');

const { sequelize } = require('../config/database');
const { Paciente } = require('../models');

// Obtiene todos los pacientes o filtra por nombre utilizando Sequelize ORM.
const obtenerPacientes = async (nombre) => {
  const where = {};

  if (nombre) {
    where.nombre = {
      [Op.iLike]: `%${nombre}%`
    };
  }

  return Paciente.findAll({
    where,
    attributes: [
      'id',
      'nombre',
      'apellido',
      'email',
      'telefono',
      'estado',
      'createdAt',
      'updatedAt'
    ],
    order: [['id', 'ASC']]
  });
};

// Realiza una consulta SQL manual.
// Se utiliza para comparar SQL directo con el acceso mediante Sequelize ORM.
const obtenerPacientesConSql = async () => {
  return sequelize.query(
    `
      SELECT
        id,
        nombre,
        apellido,
        email,
        telefono,
        estado,
        "createdAt",
        "updatedAt"
      FROM pacientes
      ORDER BY id ASC
    `,
    {
      type: QueryTypes.SELECT
    }
  );
};

// Busca un paciente por su identificador.
const obtenerPacientePorId = async (id) => {
  return Paciente.findByPk(id);
};

// Crea un nuevo paciente.
const crearPaciente = async (datosPaciente) => {
  return Paciente.create({
    nombre: datosPaciente.nombre,
    apellido: datosPaciente.apellido,
    email: datosPaciente.email,
    telefono: datosPaciente.telefono || null,
    estado: datosPaciente.estado || 'activo'
  });
};

// Actualiza únicamente los campos permitidos.
const actualizarPaciente = async (paciente, datosPaciente) => {
  const camposPermitidos = [
    'nombre',
    'apellido',
    'email',
    'telefono',
    'estado'
  ];

  const datosActualizados = {};

  camposPermitidos.forEach((campo) => {
    if (datosPaciente[campo] !== undefined) {
      datosActualizados[campo] = datosPaciente[campo];
    }
  });

  await paciente.update(datosActualizados);

  return paciente;
};

// Elimina un paciente existente de PostgreSQL.
const eliminarPaciente = async (paciente) => {
  await paciente.destroy();
};

module.exports = {
  obtenerPacientes,
  obtenerPacientesConSql,
  obtenerPacientePorId,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente
};