// models/UsuarioCompanyCliente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const CompanyCliente = require('./CompanyCliente');

const UsuarioCompanyCliente = sequelize.define('UsuarioCompanyCliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
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
},
{
  timestamps: true,
  tableName: 'usuarios_company_clientes',
});

// Definir las relaciones
UsuarioCompanyCliente.belongsTo(Usuario, { foreignKey: 'usuario_id' });
UsuarioCompanyCliente.belongsTo(CompanyCliente, { foreignKey: 'company_cliente_id' });

module.exports = UsuarioCompanyCliente;