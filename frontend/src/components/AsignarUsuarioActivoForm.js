import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../css/ActivoFijoForm.css';

const AsignarUsuarioActivoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario_correo, setUsuarioCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [tipo_conexion, setTipoConexion] = useState('');
  const [ip, setIp] = useState('');
  const [puerto, setPuerto] = useState('');
  const [usuario_responsable, setUsuarioResponsable] = useState('');
  const [ubicacion_id, setUbicacionId] = useState('');
  const [ubicaciones, setUbicaciones] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ubicacionesResponse, companiesResponse] = await Promise.all([
          api.get('/ubicaciones'),
          api.get('/company-clientes')
        ]);

        setUbicaciones(ubicacionesResponse.data);
        setCompanies(companiesResponse.data);

        if (id) {
          const response = await api.get(`/activos-fijos/${id}`);
          const data = response.data;
          setUsuarioCorreo(data.usuario_correo);
          setContraseña(data.contraseña);
          setTipoConexion(data.tipo_conexion);
          setIp(data.ip);
          setPuerto(data.puerto);
          setUsuarioResponsable(data.usuario_responsable);
          setUbicacionId(data.ubicacion_id);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
        alert('Error al obtener datos.');
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        usuario_correo,
        contraseña,
        tipo_conexion,
        ip,
        puerto,
        usuario_responsable,
        ubicacion_id
      };

      if (id) {
        await api.put(`/activos-fijos/${id}`, data);
      } else {
        await api.post('/activos-fijos', data);
      }

      alert('Activo fijo guardado con éxito.');
      navigate('/activos-fijos');
    } catch (error) {
      console.error('Error al guardar activo fijo:', error);
      alert('Error al guardar activo fijo.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Editar Activo Fijo' : 'Crear Activo Fijo'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ubicacion_id">Ubicación</label>
          <select
            id="ubicacion_id"
            className="form-control"
            value={ubicacion_id}
            onChange={(e) => setUbicacionId(e.target.value)}
            required
          >
            <option value="">Seleccione una ubicación</option>
            {ubicaciones.map(ubicacion => (
              <option key={ubicacion.id} value={ubicacion.id}>{ubicacion.nombre}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="usuario_correo">Usuario Correo</label>
          <input
            type="text"
            id="usuario_correo"
            className="form-control"
            value={usuario_correo}
            onChange={(e) => setUsuarioCorreo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="text"
            id="contraseña"
            className="form-control"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipo_conexion">Tipo de Conexión</label>
          <input
            type="text"
            id="tipo_conexion"
            className="form-control"
            value={tipo_conexion}
            onChange={(e) => setTipoConexion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ip">IP</label>
          <input
            type="text"
            id="ip"
            className="form-control"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="puerto">Puerto</label>
          <input
            type="text"
            id="puerto"
            className="form-control"
            value={puerto}
            onChange={(e) => setPuerto(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="usuario_responsable">Usuario Responsable</label>
          <select
            id="usuario_responsable"
            className="form-control"
            value={usuario_responsable}
            onChange={(e) => setUsuarioResponsable(e.target.value)}
          >
            <option value="Disponible">Disponible</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default AsignarUsuarioActivoForm;