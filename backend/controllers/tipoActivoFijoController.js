// controllers/tipoActivoFijoController.js
const TipoActivoFijo = require('../models/TipoActivoFijo');

// Obtener todos los tipos de activos fijos
const getTiposActivosFijos = async (req, res) => {
  try {
    const tiposActivosFijos = await TipoActivoFijo.findAll();
    res.json(tiposActivosFijos);
  } catch (error) {
    console.error('Error al obtener tipos de activos fijos:', error);
    res.status(500).json({ message: 'Error al obtener tipos de activos fijos.' });
  }
};

// Obtener un tipo de activo fijo por ID
const getTipoActivoFijoById = async (req, res) => {
  try {
    const tipoActivoFijo = await TipoActivoFijo.findByPk(req.params.id);
    if (!tipoActivoFijo) {
      return res.status(404).json({ message: 'Tipo de activo fijo no encontrado.' });
    }
    res.json(tipoActivoFijo);
  } catch (error) {
    console.error('Error al obtener tipo de activo fijo:', error);
    res.status(500).json({ message: 'Error al obtener tipo de activo fijo.' });
  }
};

// Crear un nuevo tipo de activo fijo
const createTipoActivoFijo = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const tipoActivoFijo = await TipoActivoFijo.create({ nombre, descripcion });
    res.status(201).json(tipoActivoFijo);
  } catch (error) {
    console.error('Error al crear tipo de activo fijo:', error);
    res.status(500).json({ message: 'Error al crear tipo de activo fijo.' });
  }
};

// Actualizar un tipo de activo fijo
const updateTipoActivoFijo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const tipoActivoFijo = await TipoActivoFijo.findByPk(id);
    if (!tipoActivoFijo) {
      return res.status(404).json({ message: 'Tipo de activo fijo no encontrado.' });
    }

    tipoActivoFijo.nombre = nombre || tipoActivoFijo.nombre;
    tipoActivoFijo.descripcion = descripcion || tipoActivoFijo.descripcion;

    await tipoActivoFijo.save();
    res.json({ message: 'Tipo de activo fijo actualizado con éxito.', tipoActivoFijo });
  } catch (error) {
    console.error('Error al actualizar tipo de activo fijo:', error);
    res.status(500).json({ message: 'Error al actualizar tipo de activo fijo.' });
  }
};

// Eliminar un tipo de activo fijo
const deleteTipoActivoFijo = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TipoActivoFijo.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Tipo de activo fijo no encontrado.' });
    }

    res.json({ message: 'Tipo de activo fijo eliminado con éxito.' });
  } catch (error) {
    console.error('Error al eliminar tipo de activo fijo:', error);
    res.status(500).json({ message: 'Error al eliminar tipo de activo fijo.' });
  }
};

module.exports = {
  getTiposActivosFijos,
  getTipoActivoFijoById,
  createTipoActivoFijo,
  updateTipoActivoFijo,
  deleteTipoActivoFijo,
};