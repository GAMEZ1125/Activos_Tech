import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AreaDashboard from './components/AreaDashboard';
import AreaForm from './components/AreaForm';
import UserDashboard from './components/UserDashboard';
import UserForm from './components/UserForm';
import PrivateRoute from './components/PrivateRoute';
import EmailConfig from './components/EmailConfig';
import TipoActivoFijoDashboard from './components/TipoActivoFijoDashboard';
import TipoActivoFijoForm from './components/TipoActivoFijoForm';
import CompanyClienteDashboard from './components/CompanyClienteDashboard';
import CompanyClienteForm from './components/CompanyClienteForm';
import ActivoFijoDashboard from './components/ActivoFijoDashboard';
import ActivoFijoForm from './components/ActivoFijoForm';
import CampoActivoFijoForm from './components/CampoActivoFijoForm';
import UbicacionDashboard from './components/UbicacionDashboard'; // Importa el componente
import UbicacionForm from './components/UbicacionForm'; // Importa el componente
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas con layout global */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="areas" element={<AreaDashboard />} />
          <Route path="areas/new" element={<AreaForm />} />
          <Route path="areas/edit/:id" element={<AreaForm />} />
          <Route path="users" element={<UserDashboard />} />
          <Route path="users/new" element={<UserForm />} />
          <Route path="users/edit/:id" element={<UserForm />} />
          <Route path="/email-config" element={<EmailConfig />} />
          <Route path="/tipos-activos-fijos" element={<TipoActivoFijoDashboard />} />
          <Route path="/tipos-activos-fijos/new" element={<TipoActivoFijoForm />} />
          <Route path="/tipos-activos-fijos/edit/:id" element={<TipoActivoFijoForm />} />
          <Route path="/tipos-activos-fijos/:tipo_activo_fijo_id/campos" element={<CampoActivoFijoForm />} />
          <Route path="/company-clientes" element={<CompanyClienteDashboard />} />
          <Route path="/company-clientes/new" element={<CompanyClienteForm />} />
          <Route path="/company-clientes/edit/:id" element={<CompanyClienteForm />} />
          <Route path="/activos-fijos" element={<ActivoFijoDashboard />} />
          <Route path="/activos-fijos/new" element={<ActivoFijoForm />} />
          <Route path="/activos-fijos/edit/:id" element={<ActivoFijoForm />} />
          <Route path="/ubicaciones" element={<UbicacionDashboard />} /> {/* Nueva ruta */}
          <Route path="/ubicaciones/new" element={<UbicacionForm />} /> {/* Nueva ruta */}
          <Route path="/ubicaciones/edit/:id" element={<UbicacionForm />} /> {/* Nueva ruta */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
