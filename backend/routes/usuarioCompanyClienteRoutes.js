// /routes/usuarioCompanyClienteRoutes.js
const express = require('express');
const usuarioCompanyClienteController = require('../controllers/usuarioCompanyClienteController');
const router = express.Router(); // Asegúrate de usar "router" aquí

// Ruta para asociar un usuario con una o más compañías clientes
router.post('/:userId/companiesclientes', usuarioCompanyClienteController.associateCompanyClienteToUser);

// Ruta para desasociar un usuario de una compañía cliente
router.delete('/:userId/companiesclientes/:companyClienteId', usuarioCompanyClienteController.disassociateCompanyClienteFromUser);

// Ruta para obtener compañías clientes asociadas a un usuario
router.get('/:userId/companiesclientes', usuarioCompanyClienteController.getUserCompaniesClientes);

module.exports = router;
