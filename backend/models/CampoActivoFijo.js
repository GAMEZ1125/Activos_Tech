const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TipoActivoFijo = require('./TipoActivoFijo');
const Campo = require('./Campo');

const CampoActivoFijo = sequelize.define('CampoActivoFijo', {
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
    campo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Campo,
            key: 'id',
        },
    },
    visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    timestamps: true,
    tableName: 'campos_activos_fijos',
});

// Definir las relaciones
CampoActivoFijo.belongsTo(TipoActivoFijo, { foreignKey: 'tipo_activo_fijo_id' });
CampoActivoFijo.belongsTo(Campo, { foreignKey: 'campo_id' });

module.exports = CampoActivoFijo;