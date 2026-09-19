const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/database');

// Modelo principal para almacenar los pacientes de KineAgenda.
const Paciente = sequelize.define(
  'Paciente',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre del paciente es obligatorio'
        }
      }
    },

    apellido: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El apellido del paciente es obligatorio'
        }
      }
    },

    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'El email ingresado no es válido'
        },
        notEmpty: {
          msg: 'El email del paciente es obligatorio'
        }
      }
    },

    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },

    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'activo',
      validate: {
        isIn: {
          args: [['activo', 'inactivo']],
          msg: 'El estado debe ser activo o inactivo'
        }
      }
    }
  },
  {
    tableName: 'pacientes',
    timestamps: true
  }
);

module.exports = Paciente;