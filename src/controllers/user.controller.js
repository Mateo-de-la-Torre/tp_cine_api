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
        const { id } = req.params;
        const { id: _, email, role, estado, ...restUser } = req.body;

        await existUserId(id);

        await User.update(restUser, {
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

