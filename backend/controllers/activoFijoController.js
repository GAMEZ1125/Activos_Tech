const ActivoFijo = require('../models/ActivoFijo');
const TipoActivoFijo = require('../models/TipoActivoFijo');
const Area = require('../models/Area');
const CompanyCliente = require('../models/CompanyCliente');
const Usuario = require('../models/Usuario');
const { RegistroCambio } = require('../models/RegistroCambio'); // Importar el modelo RegistroCambio

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
    const activoFijo = await ActivoFijo.create(req.body);

    // Registrar el cambio
    await RegistroCambio.create({
      activo_fijo_id: activoFijo.id,
      descripcion_cambio: 'Creación de activo fijo',
      fecha_cambio: new Date(),
      usuario_id: req.body.usuario_id // Asegúrate de que el usuario_id se envíe en el cuerpo de la solicitud
    });

    res.status(201).json(activoFijo);
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

    // Registrar el cambio
    await RegistroCambio.create({
      activo_fijo_id: id,
      descripcion_cambio: 'Actualización de activo fijo',
      fecha_cambio: new Date(),
      usuario_id: req.body.usuario_id // Asegúrate de que el usuario_id se envíe en el cuerpo de la solicitud
    });

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
  deleteActivoFijo
};