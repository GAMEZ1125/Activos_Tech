// controllers/companyClienteController.js
const CompanyCliente = require('../models/CompanyCliente');

// Obtener todas las company clientes
const getCompanyClientes = async (req, res) => {
  try {
    const companyClientes = await CompanyCliente.findAll();
    res.json(companyClientes);
  } catch (error) {
    console.error('Error al obtener company clientes:', error);
    res.status(500).json({ message: 'Error al obtener company clientes.' });
  }
};

// Obtener una company cliente por ID
const getCompanyClienteById = async (req, res) => {
  try {
    const companyCliente = await CompanyCliente.findByPk(req.params.id);
    if (!companyCliente) {
      return res.status(404).json({ message: 'Company cliente no encontrado.' });
    }
    res.json(companyCliente);
  } catch (error) {
    console.error('Error al obtener company cliente:', error);
    res.status(500).json({ message: 'Error al obtener company cliente.' });
  }
};

// Crear una nueva company cliente
const createCompanyCliente = async (req, res) => {
  try {
    const { nombre, correo_electronico } = req.body;
    const companyCliente = await CompanyCliente.create({ nombre, correo_electronico });
    res.status(201).json(companyCliente);
  } catch (error) {
    console.error('Error al crear company cliente:', error);
    res.status(500).json({ message: 'Error al crear company cliente.' });
  }
};

// Actualizar una company cliente
const updateCompanyCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo_electronico } = req.body;

    const companyCliente = await CompanyCliente.findByPk(id);
    if (!companyCliente) {
      return res.status(404).json({ message: 'Company cliente no encontrado.' });
    }

    companyCliente.nombre = nombre || companyCliente.nombre;
    companyCliente.correo_electronico = correo_electronico || companyCliente.correo_electronico;

    await companyCliente.save();
    res.json({ message: 'Company cliente actualizado con éxito.', companyCliente });
  } catch (error) {
    console.error('Error al actualizar company cliente:', error);
    res.status(500).json({ message: 'Error al actualizar company cliente.' });
  }
};

// Eliminar una company cliente
const deleteCompanyCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await CompanyCliente.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Company cliente no encontrado.' });
    }

    res.json({ message: 'Company cliente eliminado con éxito.' });
  } catch (error) {
    console.error('Error al eliminar company cliente:', error);
    res.status(500).json({ message: 'Error al eliminar company cliente.' });
  }
};

module.exports = {
  getCompanyClientes,
  getCompanyClienteById,
  createCompanyCliente,
  updateCompanyCliente,
  deleteCompanyCliente,
};