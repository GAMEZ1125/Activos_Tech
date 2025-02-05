// models/ActivoFijo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Area = require('./Area');
const CompanyCliente = require('./CompanyCliente');
const TipoActivoFijo = require('./TipoActivoFijo');

const ActivoFijo = sequelize.define('ActivoFijo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo_activo_fijo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoActivoFijo,
            key: 'id',
        },
    },
    nombre_activo_fijo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    marca: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    serial: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    imei: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    cpu: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    ram: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    tipo_almacenamiento: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    cantidad_almacenamiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ubicacion: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    usuario_correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    tipo_conexion: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    ip: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    puerto: {
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    usuario_responsable: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Area,
            key: 'id',
        },
    },
    company_cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CompanyCliente,
            key: 'id',
        },
    },
    estado: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    observaciones: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
},
    {
        timestamps: true,
        tableName: 'activos_fijos',
    });

// Definir las relaciones
ActivoFijo.belongsTo(Area, { foreignKey: 'area_id' });
ActivoFijo.belongsTo(CompanyCliente, { foreignKey: 'company_cliente_id' });
ActivoFijo.belongsTo(TipoActivoFijo, { foreignKey: 'tipo_activo_fijo_id' });

module.exports = ActivoFijo;