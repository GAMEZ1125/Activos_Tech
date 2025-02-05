// routes/registroActivoRoutes.js
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const registroActivoController = require('../controllers/registroActivoController');
const RegistroActivo = require('../models/RegistroActivo');
const ActivoFijo = require('../models/ActivoFijo');
const Usuario = require('../models/Usuario');
const excelJS = require('exceljs');

// Ruta para obtener todos los registros de activos
router.get('/', registroActivoController.getRegistrosActivos);

// Ruta para filtrar registros de activos (ejemplo con query params)
router.get('/filtrar', async (req, res) => {
  try {
    const { filtro } = req.query;
    const registrosActivos = await RegistroActivo.findAll({
      where: {
        [Op.or]: filtro.map((filtro) => {
          const [columna, operador, valor] = filtro.split(':');
          return { [columna]: { [operador]: valor } };
        }),
      },
    });
    res.json(registrosActivos);
  } catch (error) {
    console.error('Error al obtener registros de activos:', error);
    res.status(500).json({ message: 'Error al obtener registros de activos.' });
  }
});

// Ruta para exportar registros de activos a Excel
router.get('/exportar', async (req, res) => {
  try {
    const registrosActivos = await RegistroActivo.findAll();
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('Registros de Activos');

    registrosActivos.forEach((registroActivo) => {
      const fila = registroActivo.activo_fijo_id;
      worksheet.addRow({
        'Activo Fijo ID': registroActivo.activo_fijo_id,
        'Usuario ID': registroActivo.usuario_id,
        'Usuario': registroActivo.usuario.nombre,
        'Activo Fijo': registroActivo.activo_fijo.nombre_activo_fijo,
        'Marca': registroActivo.activo_fijo.marca,
        'Modelo': registroActivo.activo_fijo.modelo,
        'Serial': registroActivo.activo_fijo.serial,
        'IMEI': registroActivo.activo_fijo.imei,
        'CPU': registroActivo.activo_fijo.cpu,
        'RAM': registroActivo.activo_fijo.ram,
        'Tipo Almacenamiento': registroActivo.activo_fijo.tipo_almacenamiento,
        'Cantidad Almacenamiento': registroActivo.activo_fijo.cantidad_almacenamiento,
        'Ubicación': registroActivo.activo_fijo.ubicacion,
        'Contraseña': registroActivo.activo_fijo.contraseña,
        'Tipo Conexión': registroActivo.activo_fijo.tipo_conexion,
        'IP': registroActivo.activo_fijo.ip,
        'Puerto': registroActivo.activo_fijo.puerto,
        'Usuario Responsable': registroActivo.activo_fijo.usuario_responsable,
        'Estado': registroActivo.activo_fijo.estado,
        'Fecha': registroActivo.activo_fijo.createdAt,
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Seteo el tipo de contenido del archivo
    res.setHeader('Content-Disposition', 'attachment; filename="registros-activos.xlsx"'); // Nombre del archivo
    res.setHeader('Content-Length', workbook.output().byteLength); // Tamaño del archivo en bytes
    res.setHeader('Content-Security-Policy', "default-src 'self'"); // Configuración de seguridad                          
    res.write(workbook.output()); // Escribir el archivo en la respuesta
    res.end(); // Finalizar la respuesta
  } catch (error) {
    console.error('Error al exportar registros de activos:', error);
    res.status(500).json({ message: 'Error al exportar registros de activos.' });
  }
}); 

module.exports = router;