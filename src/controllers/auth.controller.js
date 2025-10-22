import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { emailValidate, passwordValidate } from "../helpers/db-validator.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).send({ error: 'Email no registrado' });
        }

        if (!user.estado) {
            return res.status(403).json({ error: 'Usuario inactivo' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).send({ error: 'Contraseña incorrecta' });
        }

        const tokenPayload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '10000h' });

        res.json({
            message: "Login exitoso",
            token
        });



    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}


export const register = async (req, res) => {
    try {
        const { id: _, estado, role, email, password, ...restUser } = req.body;

        const validatedEmail = await emailValidate(email);

        await passwordValidate(password);

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            ...restUser,
            email: validatedEmail,
            password: hashedPassword,
        })

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


export const verifyToken = async (req, res) => {
    res.json({
        message: "Token valido",
        user: req.user
    });
}


