import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ActivoFijoDashboard = () => {
  const [activosFijos, setActivosFijos] = useState([]);
  const [filteredActivosFijos, setFilteredActivosFijos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el filtro
  const [tiposActivos, setTiposActivos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState(null); // Estado para el tipo seleccionado
  const navigate = useNavigate();

  // Cargar lista de activos fijos al montar el componente
  useEffect(() => {
    const fetchActivosFijos = async () => {
      try {
        const response = await api.get('/activos-fijos');
        setActivosFijos(response.data);
        setFilteredActivosFijos(response.data); // Inicialmente mostrar todos los activos
      } catch (error) {
        console.error('Error al obtener activos fijos:', error);
      }
    };

    // Cargar lista de tipos de activos fijos
    const fetchTiposActivosFijos = async () => {
      try {
        const response = await api.get('/tipos-activos-fijos');
        setTiposActivos(response.data);
      } catch (error) {
        console.error('Error al obtener tipos de activos fijos:', error);
      }
    };

    // Cargar lista de áreas
    const fetchAreas = async () => {
      try {
        const response = await api.get('/areas');
        setAreas(response.data);
      } catch (error) {
        console.error('Error al obtener áreas:', error);
      }
    };

    // Cargar lista de compañías
    const fetchCompanies = async () => {
      try {
        const response = await api.get('/company-clientes');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error al obtener compañías:', error);
      }
    };

    fetchActivosFijos();
    fetchTiposActivosFijos();
    fetchAreas();
    fetchCompanies();
  }, []);

  // Eliminar un activo fijo
  const handleDelete = async (id) => {
    try {
      await api.delete(`/activos-fijos/${id}`);
      setActivosFijos(activosFijos.filter((activoFijo) => activoFijo.id !== id)); // Actualiza la lista después de eliminar
      setFilteredActivosFijos(filteredActivosFijos.filter((activoFijo) => activoFijo.id !== id)); // Actualiza la lista filtrada
      alert('Activo fijo eliminado con éxito.');
    } catch (error) {
      console.error('Error al eliminar activo fijo:', error);
      alert('No se pudo eliminar el activo fijo.');
    }
  };

  // Función para filtrar activos fijos
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    const filtered = activosFijos.filter(activoFijo =>
      activoFijo.nombre_activo_fijo.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredActivosFijos(filtered);
  };

  // Función para obtener el nombre del tipo de activo fijo
  const getTiposActivosNombre = (id) => {
    const tipoActivoFijo = tiposActivos.find(tipo => tipo.id === id);
    return tipoActivoFijo ? tipoActivoFijo.nombre : '';
  };

  const areasNombre = (id) => {
    const area = areas.find(area => area.id === id);
    return area ? area.nombre : '';
  };

  const companiesNombre = (id) => {
    const company = companies.find(company => company.id === id);
    return company ? company.nombre : '';
  };

  // Filtrar activos fijos por tipo seleccionado
  const handleTipoClick = (tipoId) => {
    setSelectedTipo(tipoId);
    const filtered = activosFijos.filter(activoFijo => activoFijo.tipo_activo_fijo_id === tipoId);
    setFilteredActivosFijos(filtered);
  };

  // Mostrar todos los activos fijos
  const handleMostrarTodos = () => {
    setSelectedTipo(null);
    setFilteredActivosFijos(activosFijos); // Restablecer la lista filtrada a todos los activos
  };

  return (
    <div className="container mt-5">
      <h2>Gestión de Activos Fijos</h2>
      <Link to="/activos-fijos/new" className="btn btn-primary mb-3">
        Crear Activo Fijo
      </Link>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="mb-3">
        {tiposActivos.map((tipo) => (
          <button
            key={tipo.id}
            className="btn btn-primary me-2"
            onClick={() => handleTipoClick(tipo.id)}
          >
            {tipo.nombre}
          </button>
        ))}
        <button
          className="btn btn-secondary"
          onClick={handleMostrarTodos}
        >
          Mostrar Todos
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Serial</th>
            <th>IMEI</th>
            <th>CPU</th>
            <th>RAM</th>
            <th>Tipo Almacenamiento</th>
            <th>Cantidad Almacenamiento</th>
            <th>Ubicación</th>
            <th>Correo Electrónico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivosFijos.map((activoFijo) => (
            <tr key={activoFijo.id}>
              <td>{activoFijo.nombre_activo_fijo}</td>
              <td>{getTiposActivosNombre(activoFijo.tipo_activo_fijo_id)}</td>
              <td>{activoFijo.marca}</td>
              <td>{activoFijo.modelo}</td>
              <td>{activoFijo.serial}</td>
              <td>{activoFijo.imei}</td>
              <td>{activoFijo.cpu}</td>
              <td>{activoFijo.ram}</td>
              <td>{activoFijo.tipo_almacenamiento}</td>
              <td>{activoFijo.cantidad_almacenamiento}</td>
              <td>{activoFijo.ubicacion}</td>
              <td>{activoFijo.usuario_correo}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/activos-fijos/edit/${activoFijo.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(activoFijo.id)}
                >
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

export default ActivoFijoDashboard;