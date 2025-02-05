// src/components/CompanyClienteDashboard.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const CompanyClienteDashboard = () => {
  const [companyClientes, setCompanyClientes] = useState([]);
  const [filteredCompanyClientes, setFilteredCompanyClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el filtro
  const navigate = useNavigate();

  // Cargar lista de company clientes al montar el componente
  useEffect(() => {
    const fetchCompanyClientes = async () => {
      try {
        const response = await api.get('/company-clientes');
        setCompanyClientes(response.data);
        setFilteredCompanyClientes(response.data); // Inicialmente mostrar todos los company clientes
      } catch (error) {
        console.error('Error al obtener company clientes:', error);
      }
    };
    fetchCompanyClientes();
  }, []);

  // Eliminar un company cliente
  const handleDelete = async (id) => {
    try {
      await api.delete(`/company-clientes/${id}`);
      setCompanyClientes(companyClientes.filter((companyCliente) => companyCliente.id !== id)); // Actualiza la lista después de eliminar
      setFilteredCompanyClientes(filteredCompanyClientes.filter((companyCliente) => companyCliente.id !== id)); // Actualiza la lista filtrada
      alert('Company cliente eliminado con éxito.');
    } catch (error) {
      console.error('Error al eliminar company cliente:', error);
      alert('No se pudo eliminar el company cliente.');
    }
  };

  // Función para filtrar company clientes
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    const filtered = companyClientes.filter(companyCliente =>
      companyCliente.nombre.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCompanyClientes(filtered);
  };

  return (
    <div className="container mt-5">            
      <h2>Gestión de Company Clientes</h2>
      <Link to="/company-clientes/new" className="btn btn-primary mb-3">
        Crear Company Cliente
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
            <th>Correo Electrónico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanyClientes.map((companyCliente) => (
            <tr key={companyCliente.id}>
              <td>{companyCliente.nombre}</td>
              <td>{companyCliente.correo_electronico}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/company-clientes/edit/${companyCliente.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(companyCliente.id)}
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

export default CompanyClienteDashboard;