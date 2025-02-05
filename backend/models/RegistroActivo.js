// models/RegistroActivo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const ActivoFijo = require('./ActivoFijo');

const RegistroActivo = sequelize.define('RegistroActivo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    accion: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    activo_fijo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ActivoFijo,
            key: 'id',
        },
    },
},
    {
        timestamps: true,
        tableName: 'registros_activos',
    });

// Definir las relaciones
RegistroActivo.belongsTo(Usuario, { foreignKey: 'usuario_id' });
RegistroActivo.belongsTo(ActivoFijo, { foreignKey: 'activo_fijo_id' });

module.exports = RegistroActivo;