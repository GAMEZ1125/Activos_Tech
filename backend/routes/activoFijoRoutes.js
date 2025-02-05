// routes/activoFijoRoutes.js
const express = require('express');
const { Op } = require('sequelize');
const ActivoFijo = require('../models/ActivoFijo');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para obtener todos los activos fijos
router.get('/', authenticateToken, async (req, res) => {
  try {
    const activosFijos = await ActivoFijo.findAll();
    res.json(activosFijos);
  } catch (error) {
    console.error('Error al obtener activos fijos:', error);
    res.status(500).json({ message: 'Error al obtener activos fijos' });
  }
});

// Ruta para obtener un activo fijo por ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const activoFijo = await ActivoFijo.findByPk(req.params.id);
    if (!activoFijo) {
      return res.status(404).json({ message: 'Activo fijo no encontrado' });
    }
    res.json(activoFijo);
  } catch (error) {
    console.error('Error al obtener activo fijo:', error);
    res.status(500).json({ message: 'Error al obtener activo fijo' });
  }
});

// Ruta para crear un activo fijo
router.post('/', authenticateToken, async (req, res) => {
  try {
    const nuevoActivoFijo = await ActivoFijo.create(req.body);
    res.status(201).json(nuevoActivoFijo);
  } catch (error) {
    console.error('Error al crear activo fijo:', error);
    res.status(500).json({ message: 'Error al crear activo fijo' });
  }
});

// Ruta para actualizar un activo fijo
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const activoFijo = await ActivoFijo.findByPk(req.params.id);
    if (!activoFijo) {
      return res.status(404).json({ message: 'Activo fijo no encontrado' });
    }
    await activoFijo.update(req.body);
    res.json(activoFijo);
  } catch (error) {
    console.error('Error al actualizar activo fijo:', error);
    res.status(500).json({ message: 'Error al actualizar activo fijo' });
  }
});

// Ruta para eliminar un activo fijo
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const activoFijo = await ActivoFijo.findByPk(req.params.id);
    if (!activoFijo) {
      return res.status(404).json({ message: 'Activo fijo no encontrado' });
    }
    await activoFijo.destroy();
    res.json({ message: 'Activo fijo eliminado' });
  } catch (error) {
    console.error('Error al eliminar activo fijo:', error);
    res.status(500).json({ message: 'Error al eliminar activo fijo' });
  }
});

module.exports = router;