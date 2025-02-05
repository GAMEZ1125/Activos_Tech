import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const ActivoFijoForm = () => {
  const [tiposActivos, setTiposActivos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [tipo_activo_fijo_id, setTipoActivioFijoId] = useState('');
  const [nombre_activo_fijo, setNombreActivioFijo] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [serial, setSerial] = useState('');
  const [imei, setImei] = useState('');
  const [cpu, setCpu] = useState('');
  const [ram, setRam] = useState('');
  const [tipo_almacenamiento, setTipoAlmacenamiento] = useState('');
  const [cantidad_almacenamiento, setCantidadAlmacenamiento] = useState('');
  const [ubicacion, setUbicacion] = useState('');
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
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tiposActivosFijosResponse, areasResponse, companiesResponse] = await Promise.all([
          api.get('/tipos-activos-fijos'),
          api.get('/areas'),
          api.get('/company-clientes')
        ]);

        setTiposActivos(tiposActivosFijosResponse.data);
        setAreas(areasResponse.data);
        setCompanies(companiesResponse.data);

        if (id) {
          const response = await api.get(`/activos-fijos/${id}`);
          const {
            tipo_activo_fijo_id,
            nombre_activo_fijo,
            marca,
            modelo,
            serial,
            imei,
            cpu,
            ram,
            tipo_almacenamiento,
            cantidad_almacenamiento,
            ubicacion,
            usuario_correo,
            contraseña,
            tipo_conexion,
            ip,
            puerto,
            usuario_responsable,
            area_id,
            company_cliente_id,
            estado,
            observaciones
          } = response.data;

          setTipoActivioFijoId(tipo_activo_fijo_id);
          setNombreActivioFijo(nombre_activo_fijo);
          setMarca(marca);
          setModelo(modelo);
          setSerial(serial);
          setImei(imei);
          setCpu(cpu);
          setRam(ram);
          setTipoAlmacenamiento(tipo_almacenamiento);
          setCantidadAlmacenamiento(cantidad_almacenamiento);
          setUbicacion(ubicacion);
          setUsuarioCorreo(usuario_correo);
          setContraseña(contraseña);
          setTipoConexion(tipo_conexion);
          setIp(ip);
          setPuerto(puerto);
          setUsuarioResponsable(usuario_responsable);
          setAreaId(area_id);
          setCompanyClienteId(company_cliente_id);
          setEstado(estado);
          setObservaciones(observaciones);
          setIsEditMode(true);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
        alert('Error al cargar los datos.');
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!tipo_activo_fijo_id || !nombre_activo_fijo.trim() || !marca.trim() || !modelo.trim() || !serial.trim() || !imei.trim() || !cpu.trim() || !ram.trim() || !tipo_almacenamiento.trim() || !cantidad_almacenamiento || !ubicacion.trim() || !usuario_correo.trim()) {
      alert('Por favor, complete todos los campos');
      return;
    }

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuario_correo)) {
      alert('Por favor, ingrese un correo electrónico válido');
      return;
    }

    const activoFijoData = {
      tipo_activo_fijo_id: parseInt(tipo_activo_fijo_id),
      nombre_activo_fijo: nombre_activo_fijo.trim(),
      marca: marca.trim(),
      modelo: modelo.trim(),
      serial: serial.trim(),
      imei: imei.trim(),
      cpu: cpu.trim(),
      ram: ram.trim(),
      tipo_almacenamiento: tipo_almacenamiento.trim(),
      cantidad_almacenamiento: parseInt(cantidad_almacenamiento),
      ubicacion: ubicacion.trim(),
      usuario_correo: usuario_correo.trim(),
      contraseña: contraseña.trim(),
      tipo_conexion: tipo_conexion.trim(),
      ip: ip.trim(),
      puerto: puerto.trim(),
      usuario_responsable: usuario_responsable.trim(),
      area_id: parseInt(area_id),
      company_cliente_id: parseInt(company_cliente_id),
      estado: estado.trim(),
      observaciones: observaciones.trim()
    };

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('No se encontró token de autenticación. Por favor, inicie sesión.');
        return;
      }

      const response = await api.post('/activos-fijos', activoFijoData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      alert('Activo fijo creado con éxito.');
      navigate('/activos-fijos');
    } catch (error) {
      console.error('Error detallado al guardar activo fijo:', error);

      if (error.response) {
        console.error('Datos de error:', error.response.data);
        console.error('Estado de error:', error.response.status);
        console.error('Encabezados de error:', error.response.headers);

        const mensajeError = error.response.data.message ||
          error.response.data.error ||
          'Error desconocido al guardar el activo fijo';

        if (error.response.status === 401) {
          alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
          navigate('/login');
        } else if (error.response.status === 403) {
          alert('No tiene permisos para realizar esta acción.');
        } else {
          alert(`Error: ${mensajeError}`);
        }
      } else if (error.request) {
        console.error('Solicitud de error:', error.request);
        alert('No se recibió respuesta del servidor');
      } else {
        console.error('Mensaje de error:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isEditMode ? 'Editar Activo Fijo' : 'Crear Nuevo Activo Fijo'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tipo de Activo Fijo</label>
          <select
            className="form-control"
            value={tipo_activo_fijo_id}
            onChange={(e) => setTipoActivioFijoId(e.target.value)}
          >
            <option value="">Seleccione un tipo</option>
            {tiposActivos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Nombre del Activo Fijo</label>
          <input
            type="text"
            className="form-control"
            value={nombre_activo_fijo}
            onChange={(e) => setNombreActivioFijo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Marca</label>
          <input
            type="text"
            className="form-control"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Modelo</label>
          <input
            type="text"
            className="form-control"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Serial</label>
          <input
            type="text"
            className="form-control"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>IMEI</label>
          <input
            type="text"
            className="form-control"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>CPU</label>
          <input
            type="text"
            className="form-control"
            value={cpu}
            onChange={(e) => setCpu(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>RAM</label>
          <input
            type="text"
            className="form-control"
            value={ram}
            onChange={(e) => setRam(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Tipo de Almacenamiento</label>
          <input
            type="text"
            className="form-control"
            value={tipo_almacenamiento}
            onChange={(e) => setTipoAlmacenamiento(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Cantidad de Almacenamiento</label>
          <input
            type="number"
            className="form-control"
            value={cantidad_almacenamiento}
            onChange={(e) => setCantidadAlmacenamiento(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Ubicación</label>
          <input
            type="text"
            className="form-control"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Correo del Usuario</label>
          <input
            type="email"
            className="form-control"
            value={usuario_correo}
            onChange={(e) => setUsuarioCorreo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Tipo de Conexión</label>
          <input
            type="text"
            className="form-control"
            value={tipo_conexion}
            onChange={(e) => setTipoConexion(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>IP</label>
          <input
            type="text"
            className="form-control"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Puerto</label>
          <input
            type="text"
            className="form-control"
            value={puerto}
            onChange={(e) => setPuerto(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Usuario Responsable</label>
          <input
            type="text"
            className="form-control"
            value={usuario_responsable}
            onChange={(e) => setUsuarioResponsable(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Área</label>
          <select
            className="form-control"
            value={area_id}
            onChange={(e) => setAreaId(e.target.value)}
          >
            <option value="">Seleccione un área</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Compañía Cliente</label>
          <select
            className="form-control"
            value={company_cliente_id}
            onChange={(e) => setCompanyClienteId(e.target.value)}
          >
            <option value="">Seleccione una compañía</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Estado</label>
          <input
            type="text"
            className="form-control"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Observaciones</label>
          <textarea
            className="form-control"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Actualizar' : 'Crear'} Activo Fijo
        </button>
      </form>
    </div>
  );
};

export default ActivoFijoForm;