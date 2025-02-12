import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const UbicacionDashboard = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchUbicaciones = async () => {
      try {
        const response = await api.get('/ubicaciones');
        setUbicaciones(response.data);
      } catch (error) {
        console.error('Error al obtener ubicaciones:', error);
        alert('Error al obtener ubicaciones.');
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await api.get('/company-clientes');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error al obtener compañías:', error);
        alert('Error al obtener compañías.');
      }
    };

    fetchUbicaciones();
    fetchCompanies();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta ubicación?')) {
      try {
        await api.delete(`/ubicaciones/${id}`);
        setUbicaciones(ubicaciones.filter(ubicacion => ubicacion.id !== id));
      } catch (error) {
        console.error('Error al eliminar la ubicación:', error);
        alert('Error al eliminar la ubicación.');
      }
    }
  };

  const getCompanyName = (companyId) => {
    const company = companies.find(company => company.id === companyId);
    return company ? company.nombre : 'Desconocido';
  };

  return (
    <div className="container mt-5">
      <h2>Gestión de Ubicaciones</h2>
      <Link to="/ubicaciones/new" className="btn btn-primary mb-3">
        Crear Ubicación
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Compañía Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ubicaciones.map(ubicacion => (
            <tr key={ubicacion.id}>
              <td>{ubicacion.nombre}</td>
              <td>{getCompanyName(ubicacion.company_cliente_id)}</td>
              <td>
                <Link to={`/ubicaciones/edit/${ubicacion.id}`} className="btn btn-warning me-2">
                  Editar
                </Link>
                <button onClick={() => handleDelete(ubicacion.id)} className="btn btn-danger">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UbicacionDashboard;