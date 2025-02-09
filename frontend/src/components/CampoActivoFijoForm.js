import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../css/CampoActivoFijoForm.css'; // Importa el archivo CSS

const CampoActivoFijoForm = () => {
  const { tipo_activo_fijo_id } = useParams();
  const [campos, setCampos] = useState([]);
  const [selectedCampos, setSelectedCampos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampos = async () => {
      try {
        const response = await api.get('/campos');
        setCampos(response.data);
        
        // Obtener campos obligatorios y agregarlos a selectedCampos
        const camposObligatorios = response.data
          .filter(campo => campo.obligatorio)
          .map(campo => campo.id);
        
        setSelectedCampos(prevState => {
          const newState = [...prevState, ...camposObligatorios];
          return [...new Set(newState)]; // Eliminar duplicados
        });
      } catch (error) {
        console.error('Error al obtener campos:', error);
        alert('Error al obtener los campos.');
      }
    };

    const fetchSelectedCampos = async () => {
      try {
        const response = await api.get(`/campos-activos-fijos/tipo/${tipo_activo_fijo_id}`);
        const selectedIds = response.data
          .filter(campo => campo.visible)
          .map(campo => campo.campo_id);

        setSelectedCampos(prevState => {
          const newState = [...prevState, ...selectedIds];
          return [...new Set(newState)]; // Eliminar duplicados
        });
      } catch (error) {
        console.error('Error al obtener campos seleccionados:', error);
        alert('Error al obtener los campos seleccionados.');
      }
    };

    fetchCampos();
    if (tipo_activo_fijo_id) {
      fetchSelectedCampos();
    }
  }, [tipo_activo_fijo_id]);

  const handleCampoChange = (campoId) => {
    // No permitir deseleccionar campos obligatorios
    const campo = campos.find(c => c.id === campoId);
    if (campo?.obligatorio) return;

    setSelectedCampos(prevSelectedCampos =>
      prevSelectedCampos.includes(campoId)
        ? prevSelectedCampos.filter(id => id !== campoId)
        : [...prevSelectedCampos, campoId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/campos-activos-fijos/tipo/${tipo_activo_fijo_id}`, {
        campos: campos.map(campo => ({
          campo_id: campo.id,
          visible: selectedCampos.includes(campo.id)
        }))
      });
      alert('Campos actualizados con éxito.');
      navigate('/tipos-activos-fijos');
    } catch (error) {
      console.error('Error al actualizar campos:', error);
      alert('Error al actualizar los campos.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Asignar Campos para Tipo de Activo Fijo</h2>
      <form onSubmit={handleSubmit}>
        {campos.map(campo => (
          <div key={campo.id} className="form-check">
            <input
              type="checkbox"
              className={`form-check-input ${campo.visible ? 'visible-true' : ''}`}
              id={`campo-${campo.id}`}
              checked={selectedCampos.includes(campo.id)}
              onChange={() => handleCampoChange(campo.id)}
              disabled={campo.obligatorio} // Deshabilita el checkbox si el campo es obligatorio
            />
            <label className="form-check-label" htmlFor={`campo-${campo.id}`}>
              {campo.nombre}
            </label>
          </div>
        ))}
        <button type="submit" className="btn btn-primary mt-3">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CampoActivoFijoForm;