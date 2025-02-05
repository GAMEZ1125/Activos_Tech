// controllers/activoFijoController.js
const ActivoFijo = require('../models/ActivoFijo');
const TipoActivoFijo = require('../models/TipoActivoFijo');
const Area = require('../models/Area');
const CompanyCliente = require('../models/CompanyCliente');
const Usuario = require('../models/Usuario');

// Obtener todos los activos fijos
const getActivosFijos = async (req, res) => {
  try {
    const activosFijos = await ActivoFijo.findAll();
    res.json(activosFijos);
  } catch (error) {
    console.error('Error al obtener activos fijos:', error);
    res.status(500).json({ message: 'Error al obtener activos fijos.' });
  }
};

// Obtener un activo fijo por ID
const getActivoFijoById = async (req, res) => {
  try {
    const activoFijo = await ActivoFijo.findByPk(req.params.id);
    if (!activoFijo) {
      return res.status(404).json({ message: 'Activo fijo no encontrado.' });
    }
    res.json(activoFijo);
  } catch (error) {
    console.error('Error al obtener activo fijo:', error);
    res.status(500).json({ message: 'Error al obtener activo fijo.' });
  }
};

// Crear un nuevo activo fijo
const createActivoFijo = async (req, res) => {
  try {
    const ActivoFijo = await ActivoFijo.create(req.body);
    res.status(201).json(ActivoFijo);
  } catch (error) {
    console.error('Error al crear activo fijo:', error);
    res.status(500).json({ message: 'Error al crear activo fijo.' }); 
  }
};


// Actualizar un activo fijo
const updateActivoFijo = async (req, res) => {
  try {
    const { id } = req.params;

    const activoFijo = await ActivoFijo.findByPk(id);
    if (!activoFijo) {
      return res.status(404).json({ message: 'Activo fijo no encontrado.' });
    }

    await activoFijo.update(req.body);
    res.json(activoFijo);
  } catch (error) {
    console.error('Error al actualizar activo fijo:', error);
    res.status(500).json({ message: 'Error al actualizar activo fijo.' });
  }
};

// Eliminar un activo fijo
const deleteActivoFijo = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ActivoFijo.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Activo fijo no encontrado.' });
    }

    res.json({ message: 'Activo fijo eliminado con éxito.' });
  } catch (error) {
    console.error('Error al eliminar activo fijo:', error);
    res.status(500).json({ message: 'Error al eliminar activo fijo.' });
  }
};

module.exports = {
  getActivosFijos,
  getActivoFijoById,
  createActivoFijo,
  updateActivoFijo,
  deleteActivoFijo,
};