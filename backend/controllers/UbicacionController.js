const Ubicacion = require('../models/Ubicacion');

const UbicacionController = {
    getAllUbicaciones: async (req, res) => {
        try {
            const ubicaciones = await Ubicacion.findAll();
            res.json(ubicaciones);
        } catch (error) {
            console.error('Error al obtener ubicaciones:', error);
            res.status(500).json({ message: 'Error al obtener ubicaciones' });
        }
    },

    getUbicacionById: async (req, res) => {
        try {
            const ubicacion = await Ubicacion.findByPk(req.params.id);
            if (!ubicacion) {
                return res.status(404).json({ message: 'Ubicación no encontrada' });
            }
            res.json(ubicacion);
        } catch (error) {
            console.error('Error al obtener ubicación:', error);
            res.status(500).json({ message: 'Error al obtener ubicación' });
        }
    },

    createUbicacion: async (req, res) => {
        try {
            const ubicacion = await Ubicacion.create(req.body);
            res.status(201).json(ubicacion);
        } catch (error) {
            console.error('Error al crear ubicación:', error);
            res.status(500).json({ message: 'Error al crear ubicación' });
        }
    },

    updateUbicacion: async (req, res) => {
        try {
            const ubicacion = await Ubicacion.findByPk(req.params.id);
            if (!ubicacion) {
                return res.status(404).json({ message: 'Ubicación no encontrada' });
            }
            await ubicacion.update(req.body);
            res.json(ubicacion);
        } catch (error) {
            console.error('Error al actualizar ubicación:', error);
            res.status(500).json({ message: 'Error al actualizar ubicación' });
        }
    },

    deleteUbicacion: async (req, res) => {
        try {
            const ubicacion = await Ubicacion.findByPk(req.params.id);
            if (!ubicacion) {
                return res.status(404).json({ message: 'Ubicación no encontrada' });
            }
            await ubicacion.destroy();
            res.json({ message: 'Ubicación eliminada correctamente' });
        } catch (error) {
            console.error('Error al eliminar ubicación:', error);
            res.status(500).json({ message: 'Error al eliminar ubicación' });
        }
    }
};

module.exports = UbicacionController;