import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const validarJWT = async (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(400).send({ message: 'Se necesita token para esta peticion' })
    }

    try {

        const { id } = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findByPk(id);


        if (!user) {
            return res.status(401).json({ message: 'Token no valido - Usuario no existe en BD' });
        }

        if (!user.estado) {
            return res.status(401).json({ message: 'Token no valido - Usuario con estado en false' });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error)
        res.status(402).send({ message: 'Token no valido' })
    }

}