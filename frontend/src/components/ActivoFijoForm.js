import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../css/ActivoFijoForm.css'; // Importa el archivo CSS

const ActivoFijoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tipo_activo_fijo_id, setTipoActivioFijoId] = useState('');
  const [camposVisibles, setCamposVisibles] = useState([]);
  const [nombre_activo_fijo, setNombreActivioFijo] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [serial, setSerial] = useState('');
  const [imei, setImei] = useState('');
  const [cpu, setCpu] = useState('');
  const [ram, setRam] = useState('');
  const [tipo_almacenamiento, setTipoAlmacenamiento] = useState('');
  const [cantidad_almacenamiento, setCantidadAlmacenamiento] = useState('');
  const [ubicacion_id, setUbicacionId] = useState('');
  const [usuario_correo, setUsuarioCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [tipo_conexion, setTipoConexion] = useState('');
  const [ip, setIp] = useState('');
  const [puerto, setPuerto] = useState('');
  const [usuario_responsable, setUsuarioResponsable] = useState('');
  const [area_id, setAreaId] = useState('');
  const [company_cliente_id, setCompanyClienteId] = useState('');
  const [estado, setEstado] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [tiposActivos, setTiposActivos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tiposActivosFijosResponse, areasResponse, companiesResponse, ubicacionesResponse] = await Promise.all([
          api.get('/tipos-activos-fijos'),
          api.get('/areas'),
          api.get('/company-clientes'),
          api.get('/ubicaciones')
        ]);

        setTiposActivos(tiposActivosFijosResponse.data);
        setAreas(areasResponse.data);
        setCompanies(companiesResponse.data);
        setUbicaciones(ubicacionesResponse.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        alert('Error al obtener datos.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCamposVisibles = async () => {
      if (tipo_activo_fijo_id) {
        try {
          // Obtener campos visibles con join a tabla campos
          const response = await api.get(`/campos-activos-fijos/tipo/${tipo_activo_fijo_id}`);
          const camposResponse = await api.get('/campos');
          const camposMap = {};
          camposResponse.data.forEach(campo => {
            camposMap[campo.id] = campo.nombre;
          });

          // Mapear campo_id a nombres de campos
          const camposVisiblesNombres = response.data
            .filter(campo => campo.visible)
            .map(campo => camposMap[campo.campo_id]);

          setCamposVisibles(camposVisiblesNombres);

          // Si es modo edición, obtener los datos del activo
          if (id) {            const activoResponse = await api.get(`/activos-fijos/${id}`);
            const data = activoResponse.data;

            // Actualizar estados solo para campos visibles
            Object.entries(data).forEach(([key, value]) => {
              if (camposVisiblesNombres.includes(key)) {
                switch (key) {
                  case 'nombre_activo_fijo': setNombreActivioFijo(value); break;
                  case 'marca': setMarca(value); break;
                  case 'modelo': setModelo(value); break;
                  case 'serial': setSerial(value); break;
                  case 'imei': setImei(value); break;
                  case 'cpu': setCpu(value); break;
                  case 'ram': setRam(value); break;
                  case 'tipo_almacenamiento': setTipoAlmacenamiento(value); break;
                  case 'cantidad_almacenamiento': setCantidadAlmacenamiento(value); break;
                  case 'ubicacion': setUbicacionId(value); break;
                  case 'usuario_correo': setUsuarioCorreo(value); break;
                  case 'contraseña': setContraseña(value); break;
                  case 'tipo_conexion': setTipoConexion(value); break;
                  case 'ip': setIp(value); break;
                  case 'puerto': setPuerto(value); break;
                  case 'usuario_responsable': setUsuarioResponsable(value); break;
                }
              }
            });

            // Campos obligatorios siempre se actualizan
            setAreaId(data.area_id);
            setCompanyClienteId(data.company_cliente_id);
            setEstado(data.estado);
            setObservaciones(data.observaciones);
          }
        } catch (error) {
          console.error('Error al obtener campos visibles:', error);
          alert('Error al obtener campos visibles.');
        }
      }
    };

    fetchCamposVisibles();
  }, [tipo_activo_fijo_id, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        tipo_activo_fijo_id,
        nombre_activo_fijo,
        marca: camposVisibles.includes('marca') ? marca : 'N/A',
        modelo: camposVisibles.includes('modelo') ? modelo : 'N/A',
        serial: camposVisibles.includes('serial') ? serial : 'N/A',
        imei: camposVisibles.includes('imei') ? imei : 'N/A',
        cpu: camposVisibles.includes('cpu') ? cpu : 'N/A',
        ram: camposVisibles.includes('ram') ? ram : 'N/A',
        tipo_almacenamiento: camposVisibles.includes('tipo_almacenamiento') ? tipo_almacenamiento : 'N/A',
        cantidad_almacenamiento: camposVisibles.includes('cantidad_almacenamiento') ? cantidad_almacenamiento : 'N/A',
        usuario_correo: camposVisibles.includes('usuario_correo') ? usuario_correo : 'N/A',
        contraseña: camposVisibles.includes('contraseña') ? contraseña : 'N/A',
        tipo_conexion: camposVisibles.includes('tipo_conexion') ? tipo_conexion : 'N/A',
        ip: camposVisibles.includes('ip') ? ip : 'N/A',
        puerto: camposVisibles.includes('puerto') ? puerto : 'N/A',
        usuario_responsable: camposVisibles.includes('usuario_responsable') ? usuario_responsable : 'N/A',
        area_id,
        company_cliente_id,
        ubicacion_id,
        estado,
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

  return (
    <div className="container mt-5">
      <h2>{id ? 'Editar Activo Fijo' : 'Crear Activo Fijo'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tipo_activo_fijo_id">Tipo de Activo Fijo</label>
          <select
            id="tipo_activo_fijo_id"
            className="form-control"
            value={tipo_activo_fijo_id}
            onChange={(e) => setTipoActivioFijoId(e.target.value)}
            required
          >
            <option value="">Seleccione un tipo de activo fijo</option>
            {tiposActivos.map(tipo => (
              <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
            ))}
          </select>
        </div>

        {tipo_activo_fijo_id && (
          <>
            {camposVisibles.includes('nombre_activo_fijo') && (
              <div className="form-group">
                <label htmlFor="nombre_activo_fijo">Nombre del Activo Fijo</label>
                <input
                  type="text"
                  id="nombre_activo_fijo"
                  className="form-control"
                  value={nombre_activo_fijo}
                  onChange={(e) => setNombreActivioFijo(e.target.value)}
                  required
                />
              </div>
            )}

            {camposVisibles.includes('marca') && (
              <div className="form-group">
                <label htmlFor="marca">Marca</label>
                <input
                  type="text"
                  id="marca"
                  className="form-control"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />
              </div>
            )}
            {camposVisibles.includes('modelo') && (
              <div className="form-group">
                <label htmlFor="modelo">Modelo</label>
                <input
                  type="text"
                  id="modelo"
                  className="form-control"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                />
              </div>
            )}
            {camposVisibles.includes('serial') && (
              <div className="form-group">
                <label htmlFor="serial">Serial</label>
                <input
                  type="text"
                  id="serial"
                  className="form-control"
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                />
              </div>
            )}
            {camposVisibles.includes('imei') && (
              <div className="form-group">
                <label htmlFor="imei">IMEI</label>
                <input
                  type="text"
                  id="imei"
                  className="form-control"
                  value={imei}
                  onChange={(e) => setImei(e.target.value)}
                />
              </div>
            )}
            {camposVisibles.includes('cpu') && (
              <div className="form-group">
                <label htmlFor="cpu">CPU</label>
                <input
                  type="text"
                  id="cpu"
                  className="form-control"
                  value={cpu}
                  onChange={(e) => setCpu(e.target.value)}
                />
              </div>
            )}
            {camposVisibles.includes('ram') && (
              <div className="form-group">
                <label htmlFor="ram">RAM</label>
                <input
                  type="text"
                  id="ram"
                  className="form-control"
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                />
              </div>
            )}
            {camposVisibles.includes('tipo_almacenamiento') && (
              <div className="form-group">
                <label htmlFor="tipo_almacenamiento">Tipo de Almacenamiento</label>
                <input
                  type="text"
                  id="tipo_almacenamiento"
                  className="form-control"
                  value={tipo_almacenamiento}
                  onChange={(e) => setTipoAlmacenamiento(e.target.value)}
                />
              </div>
            )}
            {camposVisibles.includes('cantidad_almacenamiento') && (
              <div className="form-group">
                <label htmlFor="cantidad_almacenamiento">Cantidad de Almacenamiento</label>
                <input
                  type="text"
                  id="cantidad_almacenamiento"
                  className="form-control"
                  value={cantidad_almacenamiento}
                  onChange={(e) => setCantidadAlmacenamiento(e.target.value)}
                />
              </div>
            )}
            {camposVisibles.includes('usuario_correo') && (
              <div className="form-group">
                <label htmlFor="usuario_correo">Usuario Correo</label>
                <input
                  type="text"
                  id="usuario_correo"
                  className="form-control"
                  value={usuario_correo}
                  onChange={(e) => setUsuarioCorreo(e.target.value)}
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
                />
              </div>
            )}
            {camposVisibles.includes('usuario_responsable') && (
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
            )}
            <div className="form-group">
              <label htmlFor="area_id">Área</label>
              <select
                id="area_id"
                className="form-control"
                value={area_id}
                onChange={(e) => setAreaId(e.target.value)}
                required
              >
                <option value="">Seleccione un área</option>
                {areas.map(area => (
                  <option key={area.id} value={area.id}>{area.nombre}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="company_cliente_id">Compañía Cliente</label>
              <select
                id="company_cliente_id"
                className="form-control"
                value={company_cliente_id}
                onChange={(e) => setCompanyClienteId(e.target.value)}
              >
                <option value="">Seleccione una compañía cliente</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>{company.nombre}</option>
                ))}
              </select>
            </div>
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
              <label htmlFor="estado">Estado</label>
              <select
                id="estado"
                className="form-control"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="">Seleccione un estado</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
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
          </>
        )}
        <button type="submit" className="btn btn-primary mt-3">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default ActivoFijoForm;