const Campo = require('../models/Campo');

const CampoController = {
  getAllCampos: async (req, res) => {
    try {
      const campos = await Campo.findAll();
      res.json(campos);
    } catch (error) {
      console.error('Error al obtener campos:', error);
      res.status(500).json({ error: 'Error al obtener campos' });
    }
  },
};

module.exports = CampoController;