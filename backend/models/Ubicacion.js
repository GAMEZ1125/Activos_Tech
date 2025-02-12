const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CompanyCliente = require('./CompanyCliente');

const Ubicacion = sequelize.define('Ubicacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  company_cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CompanyCliente,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  tableName: 'ubicaciones',
});

// Definir la relación
Ubicacion.belongsTo(CompanyCliente, { foreignKey: 'company_cliente_id' });

module.exports = Ubicacion;