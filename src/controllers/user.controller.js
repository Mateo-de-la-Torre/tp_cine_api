import bcrypt from "bcrypt";
import { existEmail, existUserId, passwordValidate } from "../helpers/db-validator.js";
import { User } from "../models/user.model.js";

export const getUser = async (req, res) => {

    try {
        const users = await User.findAll();
        res.json(users);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }

}

export const getUserId = async (req, res) => {

    try {
        const { id } = req.params;

        await existUserId(id);

        const user = await User.findByPk(id);

        res.json(user);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

export const createUser = async (req, res) => {

    try {
        const { id: _, estado, role, email, password, ...restUser } = req.body;

        await existEmail(email);
        await passwordValidate(password);

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            ...restUser,
            email,
            password: hashedPassword,
            role
        });

        res.json({
            message: "Usuario creado correctamente",
            user
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }

}

export const updateUser = async (req, res) => {

    try {
        const { id } = req.user;
        const { id: _, email, password, role, estado, ...restUser } = req.body;

        await existUserId(id);
        await passwordValidate(password);

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.update({
            ...restUser,
            password: hashedPassword
        }, {
            where: { id }
        });

        const updateUser = await User.findByPk(id);

        res.json({
            message: "Usuario actualizado correctamente",
            updateUser
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

export const estadoUser = async (req, res) => {

    try {
        const { id } = req.params;

        if (req.user.id == id && req.user.role === 'superadmin') {
            return res.status(400).json({
                message: "No puedes desactivar tu propio usuario"
            });
        }

        await existUserId(id);

        const user = await User.findByPk(id);

        const newStatus = !user.estado;

        await User.update({ estado: newStatus }, {
            where: { id }
        });

        const statusMessage = newStatus ?
            `Usuario ${user.fullName} activado` : `Usuario ${user.fullName} desactivado`;

        res.json({
            message: statusMessage,
            newStatus: newStatus
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}


export const updateUserRole = async (req, res) => {

    const { id } = req.params;
    const { role } = req.body;

    try {

        const rolesValidos = ['user', 'admin', 'superadmin'];
        if (!role || !rolesValidos.includes(role)) {
            return res.status(400).json({
                message: `Rol inválido. Roles válidos: ${rolesValidos.join(', ')}`
            });
        }

        if (req.user.id == id && req.user.role === 'superadmin') {
            return res.status(400).json({
                message: "No puedes quitarte a ti mismo el rol de superadmin"
            });
        }

        await existUserId(id);

        await User.update({ role }, {
            where: { id }
        });

        const updateRoleUser = await User.findByPk(id);

        res.json({
            message: "Rol actualizado correctamente",
            updateRoleUser
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}