// app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const areaRoutes = require('./routes/areaRoutes');
const companyClienteRoutes = require('./routes/companyClienteRoutes');
const emailConfigRoutes = require('./routes/emailConfig');
const authRoutes = require('./routes/authRoutes');
const activoFijoRoutes = require('./routes/activoFijoRoutes');
const registroCambioRoutes = require('./routes/registroCambioRoutes');
const tipoActivoFijoRoutes = require('./routes/tipoActivoFijoRoutes');
const usuarioCompanyClienteRoutes = require('./routes/usuarioCompanyClienteRoutes');
const campoActivoFijoRoutes = require('./routes/campoActivoFijoRoutes');
const campoRoutes = require('./routes/campoRoutes'); // Importa las rutas de Campo
const ubicacionRoutes = require('./routes/ubicacionRoutes'); // Importa las rutas de Ubicacion

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/areas', areaRoutes);
app.use('/api/company-clientes', companyClienteRoutes);
app.use('/api', emailConfigRoutes);
app.use('/api/activos-fijos', activoFijoRoutes);
app.use('/api/registros-activos', registroCambioRoutes);
app.use('/api/tipos-activos-fijos', tipoActivoFijoRoutes);
app.use('/api/usuarios-companies-clientes', usuarioCompanyClienteRoutes);
app.use('/api/campos-activos-fijos', campoActivoFijoRoutes);
app.use('/api/campos', campoRoutes); // Agrega la ruta de Campo
app.use('/api/ubicaciones', ubicacionRoutes); // Agrega la ruta de Ubicacion

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});