// controllers/usuarioCompanyClienteController.js
const UsuarioCompanyCliente = require('../models/UsuarioCompanyCliente');
const CompanyCliente = require('../models/CompanyCliente');

// Asociar un usuario a una company cliente
const associateCompanyClienteToUser = async (req, res) => {
    const { userId } = req.params;
    const { companyClienteId } = req.body;

    try {
        if (Array.isArray(companyClienteIds) && companyClienteIds.length > 0) {
            const usuarioCompanyClientes = companyClienteIds.map((companyClienteId) => ({ usuario_id: userId, company_cliente_id: companyClienteId }));
            await UsuarioCompanyCliente.bulkCreate(usuarioCompanyClientes, { ignoreDuplicates: true });
            return res.status(200).json({ message: 'Usuario asociado a company cliente(s) con éxito.' });
        }
        return res.status(400).json({ message: 'No se han asociado usuario(s) a company cliente(s).' });
    } catch (error) {
        console.error('Error al asociar usuario a company cliente:', error);
        return res.status(500).json({ message: 'Error al asociar usuario a company cliente.' });
    }
};

// Desasociar un usuario de una company cliente
const disassociateCompanyClienteFromUser = async (req, res) => {
    const { userId, companyClienteId } = req.params;

    try {
        const deleted = await UsuarioCompanyCliente.destroy({ where: { usuario_id: userId, company_cliente_id: companyClienteId } });
        if (!deleted) {
            return res.status(200).json({ message: 'Usuario desasociado de company cliente con éxito.' });
        }
        return res.status(404).json({ message: 'Relación no encontrado.' });
    } catch (error) {
        console.error('Error al desasociar usuario de company cliente:', error);
        return res.status(500).json({ message: 'Error al desasociar usuario de company cliente.' });
    }
};

// Obtener Companies Clientes asociados a un usuario
const getCompanyClientesForUser = async (userId) => {
    try {
        const companyClientes = await UsuarioCompanyCliente.findAll({ 
            where: { usuario_id: userId },
            include: [{ 
                model: CompanyCliente, 
                required: true,
            }],
        });
        return companyClientes.map(UsuarioCompanyCliente => UsuarioCompanyCliente.company_cliente);
    } catch (error) {
        console.error('Error al obtener company clientes asociados a un usuario:', error);
        throw error;
    }
};

// Obtener Companies Clientes asociados a un usuario
const getUserCompaniesClientes = async (req, res) => {
    const { userId } = req.params;

    try {
        const companyClientes = await getCompanyClientesForUser(userId);
        return res.status(200).json(companyClientes);
    } catch (error) {
        console.error('Error al obtener company clientes asociados a un usuario:', error);
        return res.status(500).json({ message: 'Error al obtener company clientes asociados a un usuario.' });
    }
};

module.exports = {
    associateCompanyClienteToUser,
    disassociateCompanyClienteFromUser,
    getCompanyClientesForUser,
    getUserCompaniesClientes,
};
