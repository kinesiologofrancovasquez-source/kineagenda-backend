const Paciente = require('./Paciente');
const Cita = require('./Cita');

// Un paciente puede tener muchas citas.
Paciente.hasMany(Cita, {
  foreignKey: 'pacienteId',
  as: 'citas',
  onDelete: 'CASCADE'
});

// Cada cita pertenece a un único paciente.
Cita.belongsTo(Paciente, {
  foreignKey: 'pacienteId',
  as: 'paciente'
});

module.exports = {
  Paciente,
  Cita
};