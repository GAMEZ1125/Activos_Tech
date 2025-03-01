// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <h1>Bienvenido al Sistema de Gestión de Ativos Fijos</h1>
      <p>Inicia sesión para gestionar tus Activos Fijos.</p>
      <Link to="/login" className="btn btn-primary mt-3">
        Iniciar Sesión
      </Link>
    </div>
  );
};

export default Home;
