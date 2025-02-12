import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const UbicacionDashboard = () => {
  const [ubicaciones, setUbicaciones] = useState([]);

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

    fetchUbicaciones();
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
              <td>{ubicacion.company_cliente_id}</td>
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