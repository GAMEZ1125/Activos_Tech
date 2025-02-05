const express = require('express');
const CampoActivoFijoController = require('../controllers/CampoActivoFijoController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Rutas para campos activos fijos
router.get('/', authenticateToken, CampoActivoFijoController.getAllCamposActivosFijos);
router.get('/tipo/:tipo_activo_fijo_id', authenticateToken, CampoActivoFijoController.getCamposActivosFijosByTipo);
router.post('/', authenticateToken, CampoActivoFijoController.createCampoActivoFijo);
router.put('/:id', authenticateToken, CampoActivoFijoController.updateCampoActivoFijo);
router.delete('/:id', authenticateToken, CampoActivoFijoController.deleteCampoActivoFijo);

module.exports = router;