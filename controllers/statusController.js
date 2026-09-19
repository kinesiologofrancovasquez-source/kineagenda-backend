const getStatus = (req, res) => {
  res.json({
    status: 'ok',
    message: 'KineAgenda Backend funcionando correctamente',
    data: {
      environment: process.env.NODE_ENV || 'development'
    }
  });
};

module.exports = {
  getStatus
};
