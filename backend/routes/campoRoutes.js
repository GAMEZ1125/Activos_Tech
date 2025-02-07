const express = require('express');
const router = express.Router();
const CampoController = require('../controllers/CampoController');

// Ruta para obtener todos los campos
router.get('/', CampoController.getAllCampos);

module.exports = router;