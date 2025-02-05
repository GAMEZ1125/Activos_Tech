'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('activos_fijos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo_activo_fijo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipos_activos_fijos', // Nombre de la tabla referenciada
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nombre_activo_fijo: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      marca: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      modelo: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      serial: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      imei: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      cpu: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ram: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      tipo_almacenamiento: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      cantidad_almacenamiento: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ubicacion: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      usuario_correo: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      contraseña: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      tipo_conexion: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ip: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      puerto: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      usuario_responsable: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      area_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'areas', // Nombre de la tabla referenciada
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      company_cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'company_clientes', // Nombre de la tabla referenciada
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      estado: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      observaciones:{
          type :Sequelize.STRING(255),
          allowNull:false
       }, 
       createdAt:{
         type :Sequelize.DATE,
         allowNull:false
       }, 
       updatedAt:{
         type :Sequelize.DATE,
         allowNull:false
       }
    });
  },

  down : async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('activos_fijos');
  }
};
