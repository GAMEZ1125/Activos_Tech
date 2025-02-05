// models/CompanyCliente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CompanyCliente = sequelize.define('CompanyCliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  
  correo_electronico: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  
}, {
  timestamps: true,
  tableName: 'company_clientes',
});

module.exports = CompanyCliente;