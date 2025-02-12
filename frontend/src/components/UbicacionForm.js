import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const UbicacionForm = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [companyClienteId, setCompanyClienteId] = useState('');
  const [companyClientes, setCompanyClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyClientes = async () => {
      try {
        const response = await api.get('/company-clientes');
        setCompanyClientes(response.data);
      } catch (error) {
        console.error('Error al obtener compañías clientes:', error);
        alert('Error al obtener compañías clientes.');
      }
    };

    const fetchUbicacion = async () => {
      if (id) {
        try {
          const response = await api.get(`/ubicaciones/${id}`);
          setNombre(response.data.nombre);
          setCompanyClienteId(response.data.company_cliente_id);
        } catch (error) {
          console.error('Error al obtener la ubicación:', error);
          alert('Error al obtener la ubicación.');
        }
      }
    };

    fetchCompanyClientes();
    fetchUbicacion();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { nombre, company_cliente_id: companyClienteId };
      if (id) {
        await api.put(`/ubicaciones/${id}`, data);
      } else {
        await api.post('/ubicaciones', data);
      }
      alert('Ubicación guardada con éxito.');
      navigate('/ubicaciones');
    } catch (error) {
      console.error('Error al guardar la ubicación:', error);
      alert('Error al guardar la ubicación.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Editar Ubicación' : 'Crear Ubicación'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="companyClienteId" className="form-label">Compañía Cliente</label>
          <select
            className="form-control"
            id="companyClienteId"
            value={companyClienteId}
            onChange={(e) => setCompanyClienteId(e.target.value)}
            required
          >
            <option value="">Seleccione una compañía cliente</option>
            {companyClientes.map(company => (
              <option key={company.id} value={company.id}>{company.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
};

export default UbicacionForm;