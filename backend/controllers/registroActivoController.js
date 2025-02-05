// controllers/registroActivoController.js
const RegistroActivo = require('../models/RegistroActivo');

// Obtener todos los registros de activos
const getRegistrosActivos = async (req, res) => {
  try {
    const registrosActivos = await RegistroActivo.findAll();
    res.json(registrosActivos);
  } catch (error) {
    console.error('Error al obtener registros de activos:', error);
    res.status(500).json({ message: 'Error al obtener registros de activos.' });
  }
};

module.exports = {
  getRegistrosActivos,
};