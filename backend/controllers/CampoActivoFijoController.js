const CampoActivoFijo = require('../models/CampoActivoFijo');

// Obtener todos los campos activos fijos
exports.getAllCamposActivosFijos = async (req, res) => {
  try {
    const camposActivosFijos = await CampoActivoFijo.findAll();
    res.json(camposActivosFijos);
  } catch (error) {
    console.error('Error al obtener campos activos fijos:', error);
    res.status(500).json({ message: 'Error al obtener campos activos fijos' });
  }
};

// Obtener campos activos fijos por tipo de activo fijo
exports.getCamposActivosFijosByTipo = async (req, res) => {
  try {
    const { tipo_activo_fijo_id } = req.params;
    const camposActivosFijos = await CampoActivoFijo.findAll({ where: { tipo_activo_fijo_id } });
    res.json(camposActivosFijos);
  } catch (error) {
    console.error('Error al obtener campos activos fijos por tipo:', error);
    res.status(500).json({ message: 'Error al obtener campos activos fijos por tipo' });
  }
};

// Crear un nuevo campo activo fijo
exports.createCampoActivoFijo = async (req, res) => {
  try {
    const { tipo_activo_fijo_id, campo, visible } = req.body;
    const nuevoCampoActivoFijo = await CampoActivoFijo.create({ tipo_activo_fijo_id, campo, visible });
    res.status(201).json(nuevoCampoActivoFijo);
  } catch (error) {
    console.error('Error al crear campo activo fijo:', error);
    res.status(500).json({ message: 'Error al crear campo activo fijo' });
  }
};

// Actualizar un campo activo fijo
exports.updateCampoActivoFijo = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo_activo_fijo_id, campo, visible } = req.body;
    const campoActivoFijo = await CampoActivoFijo.findByPk(id);
    if (!campoActivoFijo) {
      return res.status(404).json({ message: 'Campo activo fijo no encontrado' });
    }
    await campoActivoFijo.update({ tipo_activo_fijo_id, campo, visible });
    res.json(campoActivoFijo);
  } catch (error) {
    console.error('Error al actualizar campo activo fijo:', error);
    res.status(500).json({ message: 'Error al actualizar campo activo fijo' });
  }
};

// Eliminar un campo activo fijo
exports.deleteCampoActivoFijo = async (req, res) => {
  try {
    const { id } = req.params;
    const campoActivoFijo = await CampoActivoFijo.findByPk(id);
    if (!campoActivoFijo) {
      return res.status(404).json({ message: 'Campo activo fijo no encontrado' });
    }
    await campoActivoFijo.destroy();
    res.json({ message: 'Campo activo fijo eliminado' });
  } catch (error) {
    console.error('Error al eliminar campo activo fijo:', error);
    res.status(500).json({ message: 'Error al eliminar campo activo fijo' });
  }
};