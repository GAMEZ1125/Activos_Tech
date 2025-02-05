// migrations/2024XXXXXX-actualizar-activo-fijo.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
      // Modificar la relación de tipo_activo_fijo_id
      await queryInterface.changeColumn('activos_fijos', 'tipo_activo_fijo_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'TipoActivoFijos', // Tabla referenciada
              key: 'id',
          },
      });

      // Modificar la relación de area_id
      await queryInterface.changeColumn('activos_fijos', 'area_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Areas', // Tabla referenciada
              key: 'id',
          },
      });

      // Modificar la relación de company_cliente_id
      await queryInterface.changeColumn('activos_fijos', 'company_cliente_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'CompanyClientes', // Tabla referenciada
              key: 'id',
          },
      });

      // Si necesitas agregar o eliminar columnas adicionales, hazlo aquí.
      // Por ejemplo, si has cambiado el nombre de alguna columna o añadido un campo.
  },

  down: async (queryInterface, Sequelize) => {
      // Aquí defines los cambios para revertir la migración si es necesario
      await queryInterface.changeColumn('activos_fijos', 'tipo_activo_fijo_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'TipoActivoFijos',
              key: 'id',
          },
      });

      await queryInterface.changeColumn('activos_fijos', 'area_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Areas',
              key: 'id',
          },
      });

      await queryInterface.changeColumn('activos_fijos', 'company_cliente_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'CompanyClientes',
              key: 'id',
          },
      });

      // Si eliminaste alguna columna o cambiaste algo que no es reversible automáticamente, también deberías revertirlo aquí.
  }
};
