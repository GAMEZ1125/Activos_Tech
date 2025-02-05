'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('campos_activos_fijos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo_activo_fijo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipos_activos_fijos', // Asegúrate de que el nombre de la tabla sea correcto
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      campo: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      visible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('campos_activos_fijos');
  }
};