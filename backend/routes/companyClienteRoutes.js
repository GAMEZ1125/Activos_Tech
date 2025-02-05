// src/routes/companyClienteRoutes.js
const express = require('express');
const router = express.Router();
const companyClienteController = require('../controllers/companyClienteController');
const authenticateToken = require('../middlewares/authMiddleware'); // Importación del middleware

// Ruta para obtener todas las companies clientes
router.get('/', authenticateToken, companyClienteController.getCompanyClientes);

// Ruta para obtener una company cliente por ID
router.get('/:id', authenticateToken, companyClienteController.getCompanyClienteById);

// Ruta para crear una nueva company cliente
router.post('/', authenticateToken, companyClienteController.createCompanyCliente);

// Ruta para actualizar una company cliente
router.put('/:id', authenticateToken, companyClienteController.updateCompanyCliente);

// Ruta para eliminar una company cliente
router.delete('/:id', authenticateToken, companyClienteController.deleteCompanyCliente);

module.exports = router;
