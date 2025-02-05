// src/components/CompanyClienteForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const CompanyClienteForm = () => {
  const [nombre, setNombre] = useState('');
  const [correo_electronico, setCorreoElectronico] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Cargar datos del company cliente si estamos en modo edición
  useEffect(() => {
    if (id) {
      const fetchCompanyCliente = async () => {
        try {
          const response = await api.get(`/company-clientes/${id}`);
          const { nombre, correo_electronico } = response.data;
          setNombre(nombre);
          setCorreoElectronico(correo_electronico);
          setIsEditMode(true);
        } catch (error) {
          console.error('Error al cargar company cliente:', error);
          alert('Error al cargar el company cliente.');
        }
      };
      fetchCompanyCliente();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!nombre.trim() || !correo_electronico.trim()) {
      alert('Por favor, complete todos los campos');
      return;
    }

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo_electronico)) {
      alert('Por favor, ingrese un correo electrónico válido');
      return;
    }

    const companyClienteData = { 
      nombre: nombre.trim(), 
      correo_electronico: correo_electronico.trim() 
    };

    try {
      if (isEditMode) {
        // Actualizar company cliente existente
        const response = await api.put(`/company-clientes/${id}`, companyClienteData);
        console.log('Respuesta de actualización:', response);
        alert('Company cliente actualizado con éxito.');
      } else {
        // Crear nuevo company cliente
        const response = await api.post('/company-clientes', companyClienteData);
        console.log('Respuesta de creación:', response);
        alert('Company cliente creado con éxito.');
      }
      navigate('/company-clientes'); // Redirigir al dashboard de company clientes
    } catch (error) {
      console.error('Error detallado al guardar company cliente:', error.response || error);
      
      // Mensaje de error más descriptivo
      const errorMessage = error.response?.data?.message || 
                           error.message || 
                           'Error desconocido al guardar el company cliente';
      
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isEditMode ? 'Editar Company Cliente' : 'Crear Nuevo Company Cliente'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            minLength={2}
            maxLength={100}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            value={correo_electronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            required
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
        >
          {isEditMode ? 'Actualizar Company Cliente' : 'Crear Company Cliente'}
        </button>
        
        <button 
          type="button" 
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/company-clientes')}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default CompanyClienteForm;