const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Campo = sequelize.define('Campo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    tipo_dato: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    longitud: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    timestamps: true,
    tableName: 'campos',
});

module.exports = Campo;