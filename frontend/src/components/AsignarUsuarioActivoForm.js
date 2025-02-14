import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
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
  const [company_cliente_id, setCompanyClienteId] = useState('');
  const [camposVisibles, setCamposVisibles] = useState([]);
  const [usuariosResponsables, setUsuariosResponsables] = useState([]);
  const [identidad, setIdentidad] = useState('');
  const [nuevoUsuarioResponsable, setNuevoUsuarioResponsable] = useState('');
  const [observaciones, setObservaciones] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ubicacionesResponse, activosResponse] = await Promise.all([
          api.get('/ubicaciones'),
          api.get('/activos-fijos')
        ]);

        setUbicaciones(ubicacionesResponse.data);

        // Obtener usuarios responsables de los activos
        const usuariosResponsablesData = activosResponse.data.map(activo => ({
          value: activo.usuario_responsable,
          label: activo.usuario_responsable
        }));
        setUsuariosResponsables(usuariosResponsablesData);

        if (id) {
          const response = await api.get(`/activos-fijos/${id}`);
          const data = response.data;
          setUsuarioCorreo(data.usuario_correo);
          setContraseña(data.contraseña);
          setTipoConexion(data.tipo_conexion);
          setIp(data.ip);
          setPuerto(data.puerto);
          setUsuarioResponsable(data.usuario_responsable);
          setIdentidad(data.identidad);
          setUbicacionId(data.ubicacion_id);
          setCompanyClienteId(data.company_cliente_id);
          setObservaciones(data.observaciones);

          // Obtener campos visibles con join a tabla campos
          const camposResponse = await api.get(`/campos-activos-fijos/tipo/${data.tipo_activo_fijo_id}`);
          const camposMap = {};
          const allCamposResponse = await api.get('/campos');
          allCamposResponse.data.forEach(campo => {
            camposMap[campo.id] = campo.nombre;
          });

          // Mapear campo_id a nombres de campos
          const camposVisiblesNombres = camposResponse.data
            .filter(campo => campo.visible)
            .map(campo => camposMap[campo.campo_id]);

          setCamposVisibles(camposVisiblesNombres);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
        alert('Error al obtener datos.');
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchUbicaciones = async () => {
      if (company_cliente_id) {
        try {
          const response = await api.get(`/ubicaciones`);
          // Filtrar ubicaciones por compañía
          const ubicacionesFiltradas = response.data.filter(
            ubicacion => ubicacion.company_cliente_id === parseInt(company_cliente_id)
          );
          setUbicaciones(ubicacionesFiltradas);
          // Limpiar ubicación seleccionada si no está en las ubicaciones filtradas
          if (!ubicacionesFiltradas.find(u => u.id === parseInt(ubicacion_id))) {
            setUbicacionId('');
          }
        } catch (error) {
          console.error('Error al obtener ubicaciones:', error);
          alert('Error al obtener ubicaciones.');
        }
      } else {
        // Si no hay compañía seleccionada, limpiar ubicaciones
        setUbicaciones([]);
        setUbicacionId('');
      }
    };

    fetchUbicaciones();
  }, [company_cliente_id]);

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
        identidad,
        ubicacion_id,
        observaciones
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

  const handleCreateUser = () => {
    if (nuevoUsuarioResponsable.trim() !== '') {
      const newUser = { value: nuevoUsuarioResponsable, label: nuevoUsuarioResponsable };
      setUsuariosResponsables([...usuariosResponsables, newUser]);
      setUsuarioResponsable(nuevoUsuarioResponsable);
      setNuevoUsuarioResponsable('');
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Editar Activo Fijo' : 'Crear Activo Fijo'}</h2>
      <form onSubmit={handleSubmit}>
        {camposVisibles.includes('usuario_correo') && (
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
        )}
        {camposVisibles.includes('contraseña') && (
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
        )}
        {camposVisibles.includes('tipo_conexion') && (
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
        )}
        {camposVisibles.includes('ip') && (
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
        )}
        {camposVisibles.includes('puerto') && (
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
        )}
        <div className="form-group">
          <label htmlFor="usuario_responsable">Usuario Responsable</label>
          <Select
            id="usuario_responsable"
            options={usuariosResponsables}
            value={usuariosResponsables.find(user => user.value === usuario_responsable)}
            onChange={(selectedOption) => setUsuarioResponsable(selectedOption ? selectedOption.value : '')}
            isClearable
            placeholder="Seleccione un usuario..."
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Nuevo usuario responsable"
            value={nuevoUsuarioResponsable}
            onChange={(e) => setNuevoUsuarioResponsable(e.target.value)}
          />
          <button type="button" className="btn btn-link" onClick={handleCreateUser}>
            Crear nuevo usuario
          </button>
        </div>
        {camposVisibles.includes('identidad') && (
          <div className="form-group">
            <label htmlFor="identidad">Identidad</label>
            <input
              type="text"
              id="identidad"
              className="form-control"
              value={identidad}
              onChange={(e) => setIdentidad(e.target.value)}
              required
            />
          </div>
        )}
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
          <label htmlFor="observaciones">Observaciones</label>
          <textarea
            id="observaciones"
            className="form-control"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default AsignarUsuarioActivoForm;