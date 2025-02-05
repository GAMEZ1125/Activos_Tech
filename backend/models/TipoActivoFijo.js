// models/TipoActivoFijo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoActivoFijo = sequelize.define('TipoActivoFijo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
},
{
    timestamps: true,
    tableName: 'tipos_activos_fijos',
});

module.exports = TipoActivoFijo;