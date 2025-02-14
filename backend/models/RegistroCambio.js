const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RegistroCambio = sequelize.define('RegistroCambio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  activo_fijo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'activos_fijos', // Nombre correcto de la tabla
      key: 'id'
    }
  },
  descripcion_cambio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_cambio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', // Nombre correcto de la tabla
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'registro_cambios',
});

// Definir las relaciones después de importar los modelos
const initRegistroCambio = (models) => {
  RegistroCambio.belongsTo(models.ActivoFijo, { 
    foreignKey: 'activo_fijo_id',
    as: 'activoFijo'
  });
  RegistroCambio.belongsTo(models.Usuario, { 
    foreignKey: 'usuario_id',
    as: 'usuario'
  });
};

module.exports = {
  RegistroCambio,
  initRegistroCambio
};