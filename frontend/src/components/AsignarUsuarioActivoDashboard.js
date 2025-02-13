import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const AsignarUsuarioActivoDashboard = () => {
    const [activos, setActivos] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [activosResponse, ubicacionesResponse, companiesResponse] = await Promise.all([
                    api.get('/activos-fijos'),
                    api.get('/ubicaciones'),
                    api.get('/company-clientes')
                ]);

                setActivos(activosResponse.data);
                setUbicaciones(ubicacionesResponse.data);
                setCompanies(companiesResponse.data);
            } catch (error) {
                console.error('Error al obtener datos:', error);
                alert('Error al obtener datos.');
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este registro?')) {
            try {
                await api.delete(`/activos-fijos/${id}`);
                setActivos(activos.filter(activo => activo.id !== id));
                alert('Activo eliminado con éxito');
            } catch (error) {
                console.error('Error al eliminar activo:', error);
                alert('Error al eliminar activo');
            }
        }
    };

    const filteredActivos = activos.filter(activo =>
        activo.usuario_responsable.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activo.usuario_correo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getUbicacionNombre = (ubicacionId) => {
        const ubicacion = ubicaciones.find(u => u.id === ubicacionId);
        return ubicacion ? ubicacion.nombre : 'No asignada';
    };

    const handleAssign = (id) => {
        navigate(`/asignar-usuario/edit/${id}`);
    };

    return (
        <div className="container mt-5">
            <h2>Gestión de Activos Asignados</h2>
            <div className="mb-3">
                {/* <Link to="/asignar-usuario/new" className="btn btn-primary">
          Asignar Nuevo Usuario
        </Link> */}
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por usuario o correo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Activo Fijo</th>
                            <th>Usuario Responsable</th>
                            <th>Correo</th>
                            <th>Tipo Conexión</th>
                            <th>IP</th>
                            <th>Puerto</th>
                            <th>Ubicación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredActivos.map(activo => (
                            <tr key={activo.id}>
                                <td>{activo.nombre_activo_fijo}</td>
                                <td>{activo.usuario_responsable}</td>
                                <td>{activo.usuario_correo}</td>
                                <td>{activo.tipo_conexion}</td>
                                <td>{activo.ip}</td>
                                <td>{activo.puerto}</td>
                                <td>{getUbicacionNombre(activo.ubicacion_id)}</td>
                                <td>
                                    {/* <Link
                                        to={`/asignar-usuario/edit/${activo.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Editar
                                    </Link> */}
                                    {/* <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => handleDelete(activo.id)}
                                    >
                                        Eliminar
                                    </button> */}
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleAssign(activo.id)}
                                    >
                                        Asignar/Cambiar Usuario
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AsignarUsuarioActivoDashboard;