const CampoActivoFijo = require('../models/CampoActivoFijo');

const CampoActivoFijoController = {
  getAllCamposActivosFijos: async (req, res) => {
    try {
      const camposActivosFijos = await CampoActivoFijo.findAll();
      res.json(camposActivosFijos);
    } catch (error) {
      console.error('Error al obtener campos activos fijos:', error);
      res.status(500).json({ error: 'Error al obtener campos activos fijos' });
    }
  },

  getCamposActivosFijosByTipo: async (req, res) => {
    const { tipo_activo_fijo_id } = req.params;
    try {
      const camposActivosFijos = await CampoActivoFijo.findAll({ where: { tipo_activo_fijo_id } });
      res.json(camposActivosFijos);
    } catch (error) {
      console.error('Error al obtener campos activos fijos por tipo:', error);
      res.status(500).json({ error: 'Error al obtener campos activos fijos por tipo' });
    }
  },

  createCampoActivoFijo: async (req, res) => {
    const { tipo_activo_fijo_id, campo_id, visible } = req.body;
    try {
      const newCampoActivoFijo = await CampoActivoFijo.create({ tipo_activo_fijo_id, campo_id, visible });
      res.status(201).json(newCampoActivoFijo);
    } catch (error) {
      console.error('Error al crear campo activo fijo:', error);
      res.status(500).json({ error: 'Error al crear campo activo fijo' });
    }
  },

  updateCampoActivoFijo: async (req, res) => {
    const { id } = req.params;
    const { tipo_activo_fijo_id, campo_id, visible } = req.body;
    try {
      const campoActivoFijo = await CampoActivoFijo.findByPk(id);
      if (!campoActivoFijo) {
        return res.status(404).json({ error: 'Campo activo fijo no encontrado' });
      }
      campoActivoFijo.tipo_activo_fijo_id = tipo_activo_fijo_id;
      campoActivoFijo.campo_id = campo_id;
      campoActivoFijo.visible = visible;
      await campoActivoFijo.save();
      res.json(campoActivoFijo);
    } catch (error) {
      console.error('Error al actualizar campo activo fijo:', error);
      res.status(500).json({ error: 'Error al actualizar campo activo fijo' });
    }
  },

  deleteCampoActivoFijo: async (req, res) => {
    const { id } = req.params;
    try {
      const campoActivoFijo = await CampoActivoFijo.findByPk(id);
      if (!campoActivoFijo) {
        return res.status(404).json({ error: 'Campo activo fijo no encontrado' });
      }
      await campoActivoFijo.destroy();
      res.json({ message: 'Campo activo fijo eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar campo activo fijo:', error);
      res.status(500).json({ error: 'Error al eliminar campo activo fijo' });
    }
  },

  updateCamposByTipo: async (req, res) => {
    const { tipo_activo_fijo_id } = req.params;
    const { campos } = req.body;

    try {
      // Eliminar las relaciones existentes para el tipo de activo fijo
      await CampoActivoFijo.destroy({ where: { tipo_activo_fijo_id } });

      // Crear nuevas relaciones solo para los campos seleccionados
      const newCampos = campos.filter(campo => campo.visible).map(campo => ({
        tipo_activo_fijo_id,
        campo_id: campo.campo_id,
        visible: campo.visible,
      }));
      await CampoActivoFijo.bulkCreate(newCampos);

      res.json({ message: 'Campos actualizados con éxito.' });
    } catch (error) {
      console.error('Error al actualizar campos:', error);
      res.status(500).json({ error: 'Error al actualizar campos' });
    }
  },
};

module.exports = CampoActivoFijoController;