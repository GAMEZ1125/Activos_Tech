import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const CampoActivoFijoForm = () => {
  const { tipo_activo_fijo_id } = useParams();
  const [campos, setCampos] = useState([]);
  const [selectedCampos, setSelectedCampos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampos = async () => {
      try {
        const response = await api.get(`/campos-activos-fijos/tipo/${tipo_activo_fijo_id}`);
        setCampos(response.data);
        setSelectedCampos(response.data.filter(campo => campo.visible).map(campo => campo.campo));
      } catch (error) {
        console.error('Error al obtener campos:', error);
        alert('Error al obtener los campos.');
      }
    };
    fetchCampos();
  }, [tipo_activo_fijo_id]);

  const handleCampoChange = (campo) => {
    setSelectedCampos(prevSelectedCampos =>
      prevSelectedCampos.includes(campo)
        ? prevSelectedCampos.filter(c => c !== campo)
        : [...prevSelectedCampos, campo]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/campos-activos-fijos/tipo/${tipo_activo_fijo_id}`, {
        campos: campos.map(campo => ({
          ...campo,
          visible: selectedCampos.includes(campo.campo)
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
              className="form-check-input"
              id={`campo-${campo.id}`}
              checked={selectedCampos.includes(campo.campo)}
              onChange={() => handleCampoChange(campo.campo)}
            />
            <label className="form-check-label" htmlFor={`campo-${campo.id}`}>
              {campo.campo}
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