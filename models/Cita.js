const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/database');

// Modelo que representa una cita kinésica agendada para un paciente.
const Cita = sequelize.define(
  'Cita',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La fecha de la cita es obligatoria'
        }
      }
    },

    hora: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La hora de la cita es obligatoria'
        }
      }
    },

    motivo: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El motivo de la cita es obligatorio'
        }
      }
    },

    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'pendiente',
      validate: {
        isIn: {
          args: [['pendiente', 'confirmada', 'realizada', 'cancelada']],
          msg: 'El estado debe ser pendiente, confirmada, realizada o cancelada'
        }
      }
    },

    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    pacienteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'citas',
    timestamps: true
  }
);

module.exports = Cita;