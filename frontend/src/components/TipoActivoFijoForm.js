// src/components/TipoActivoFijo.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const TipoActivoFijo = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); // Captura el ID para modo edición

  // Cargar datos del tipo de activo fijo si estamos en modo edición
  useEffect(() => {
    if (id) {
      const fetchTipoActivoFijo = async () => {
        try {
          const response = await api.get(`/tipos_activos_fijos/${id}`);
          const { nombre, descripcion } = response.data;
          setNombre(nombre);
          setDescripcion(descripcion);
          setIsEditMode(true);
        } catch (error) {
          console.error('Error al cargar tipo de activo fijo:', error);
          alert('Error al cargar el tipo de activo fijo.');
        }
      };
      fetchTipoActivoFijo();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tipoActivoFijoData = { nombre, descripcion };

    try {
      if (isEditMode) {
        // Actualizar tipo de activo fijo existente
        await api.put(`/tipos-activos-fijos/${id}`, tipoActivoFijoData);
        alert('Tipo de activo fijo actualizado con éxito.');
      } else {
        // Crear nuevo tipo de activo fijo
        await api.post('/tipos-activos-fijos', tipoActivoFijoData);
        alert('Tipo de activo fijo creado con éxito.');
      }
      navigate('/tipos-activos-fijos'); // Redirigir al dashboard de tipos de activos fijos
    } catch (error) {
      console.error('Error al guardar tipo de activo fijo:', error);
      alert('Error al guardar el tipo de activo fijo.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isEditMode ? 'Editar Tipo de Activo Fijo' : 'Crear Nuevo Tipo de Activo Fijo'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Descripción</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Actualizar Tipo de Activo Fijo' : 'Crear Tipo de Activo Fijo'}
        </button>
      </form>
    </div>
  );
};  

export default TipoActivoFijo;