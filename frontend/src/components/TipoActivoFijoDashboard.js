import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const TipoActivoFijoDashboard = () => {
  const [tiposActivosFijos, setTiposActivosFijos] = useState([]);
  const [filteredTiposActivosFijos, setFilteredTiposActivosFijos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el filtro
  const navigate = useNavigate();

  // Cargar lista de tipos de activos fijos al montar el componente
  useEffect(() => {
    const fetchTiposActivosFijos = async () => {
      try {
        const response = await api.get('/tipos-activos-fijos');
        setTiposActivosFijos(response.data);
        setFilteredTiposActivosFijos(response.data); // Inicialmente mostrar todos los tipos de activos fijos
      } catch (error) {
        console.error('Error al obtener tipos de activos fijos:', error);
      }
    };
    fetchTiposActivosFijos();
  }, []);

  // Eliminar un tipo de activo fijo
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tipos-activos-fijos/${id}`);
      setTiposActivosFijos(tiposActivosFijos.filter((tipoActivoFijo) => tipoActivoFijo.id !== id)); // Actualiza la lista después de eliminar
      setFilteredTiposActivosFijos(filteredTiposActivosFijos.filter((tipoActivoFijo) => tipoActivoFijo.id !== id)); // Actualiza la lista filtrada
      alert('Tipo de activo fijo eliminado con éxito.');
    } catch (error) {
      console.error('Error al eliminar tipo de activo fijo:', error);
      alert('No se pudo eliminar el tipo de activo fijo.');
    }
  };

  // Función para filtrar tipos de activos fijos
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    const filtered = tiposActivosFijos.filter(tipoActivoFijo =>
      tipoActivoFijo.nombre.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTiposActivosFijos(filtered);
  };

  return (
    <div className="container mt-5">
      <h2>Gestión de Tipos de Activos Fijos</h2>
      <Link to="/tipos-activos-fijos/new" className="btn btn-primary mb-3">
        Crear Tipo de Activo Fijo
      </Link>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredTiposActivosFijos.map((tipoActivoFijo) => (
            <tr key={tipoActivoFijo.id}>
              <td>{tipoActivoFijo.nombre}</td>
              <td>{tipoActivoFijo.descripcion}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/tipos-activos-fijos/edit/${tipoActivoFijo.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(tipoActivoFijo.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => navigate(`/tipos-activos-fijos/${tipoActivoFijo.id}/campos`)}
                >
                  Vincular Campos
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TipoActivoFijoDashboard;