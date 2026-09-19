const citaService = require('../services/citaService');

// GET /citas
const getCitas = async (req, res) => {
  try {
    const { estado } = req.query;

    const citas = await citaService.obtenerCitas(estado);

    return res.status(200).json({
      status: 'success',
      message: 'Citas obtenidas correctamente',
      cantidad: citas.length,
      data: citas
    });
  } catch (error) {
    console.error('Error al obtener citas:', error.message);

    return res.status(500).json({
      status: 'error',
      message: 'No fue posible obtener las citas'
    });
  }
};

// GET /citas/:id
const getCitaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const cita = await citaService.obtenerCitaPorId(id);

    if (!cita) {
      return res.status(404).json({
        status: 'error',
        message: 'Cita no encontrada'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Cita obtenida correctamente',
      data: cita
    });
  } catch (error) {
    console.error('Error al obtener cita:', error.message);

    return res.status(500).json({
      status: 'error',
      message: 'No fue posible obtener la cita'
    });
  }
};

// POST /citas
const postCita = async (req, res) => {
  try {
    const { fecha, hora, motivo, pacienteId } = req.body;

    if (!fecha || !hora || !motivo || !pacienteId) {
      return res.status(400).json({
        status: 'error',
        message: 'Fecha, hora, motivo y pacienteId son obligatorios'
      });
    }

    const paciente = await citaService.obtenerPacientePorId(pacienteId);

    if (!paciente) {
      return res.status(404).json({
        status: 'error',
        message: 'El paciente indicado no existe'
      });
    }

    const nuevaCita = await citaService.crearCita(req.body);

    const citaCompleta = await citaService.obtenerCitaPorId(nuevaCita.id);

    return res.status(201).json({
      status: 'success',
      message: 'Cita creada correctamente',
      data: citaCompleta
    });
  } catch (error) {
    console.error('Error al crear cita:', error.message);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        status: 'error',
        message: error.errors[0].message
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'No fue posible crear la cita'
    });
  }
};

// PUT /citas/:id
const putCita = async (req, res) => {
  try {
    const { id } = req.params;

    const cita = await citaService.obtenerCitaPorId(id);

    if (!cita) {
      return res.status(404).json({
        status: 'error',
        message: 'Cita no encontrada'
      });
    }

    if (req.body.pacienteId !== undefined) {
      const paciente = await citaService.obtenerPacientePorId(
        req.body.pacienteId
      );

      if (!paciente) {
        return res.status(404).json({
          status: 'error',
          message: 'El paciente indicado no existe'
        });
      }
    }

    const citaActualizada = await citaService.actualizarCita(
      cita,
      req.body
    );

    return res.status(200).json({
      status: 'success',
      message: 'Cita actualizada correctamente',
      data: citaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar cita:', error.message);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        status: 'error',
        message: error.errors[0].message
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'No fue posible actualizar la cita'
    });
  }
};

// DELETE /citas/:id
const deleteCita = async (req, res) => {
  try {
    const { id } = req.params;

    const cita = await citaService.obtenerCitaPorId(id);

    if (!cita) {
      return res.status(404).json({
        status: 'error',
        message: 'Cita no encontrada'
      });
    }

    await citaService.eliminarCita(cita);

    return res.status(200).json({
      status: 'success',
      message: 'Cita eliminada correctamente',
      data: {
        id: cita.id,
        fecha: cita.fecha,
        hora: cita.hora
      }
    });
  } catch (error) {
    console.error('Error al eliminar cita:', error.message);

    return res.status(500).json({
      status: 'error',
      message: 'No fue posible eliminar la cita'
    });
  }
};

module.exports = {
  getCitas,
  getCitaPorId,
  postCita,
  putCita,
  deleteCita
};