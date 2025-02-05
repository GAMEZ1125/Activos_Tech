// routes/tipoActivoFijoRoutes.js
const express = require('express');
const router = express.Router();
const tipoActivoFijoController = require('../controllers/tipoActivoFijoController');
const authenticateToken = require('../middlewares/authMiddleware'); // Agregado el middleware

// Ruta para obtener todos los tipos de activos fijos
router.get('/', authenticateToken, tipoActivoFijoController.getTiposActivosFijos);

// Ruta para obtener un tipo de activo fijo por ID
router.get('/:id', authenticateToken, tipoActivoFijoController.getTipoActivoFijoById);

// Ruta para crear un nuevo tipo de activo fijo
router.post('/', authenticateToken, tipoActivoFijoController.createTipoActivoFijo);

// Ruta para actualizar un tipo de activo fijo
router.put('/:id', authenticateToken, tipoActivoFijoController.updateTipoActivoFijo);

// Ruta para eliminar un tipo de activo fijo
router.delete('/:id', authenticateToken, tipoActivoFijoController.deleteTipoActivoFijo);

module.exports = router;
