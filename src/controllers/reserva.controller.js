import { sequelize } from "../config/db/db.js";
import { existFuncionId, existReservaId, existUserId } from "../helpers/db-validator.js";
import { Funcion, Reserva } from "../models/index.js";


export const getReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll();
        res.json({
            message: "Reservas obtenidas correctamente",
            reservas
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las reservas",
            error: error.message
        });
    }
}

export const getReservasByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const reservas = await Reserva.findAll({
            where: { userId: id }
        });
        res.json({
            message: `Reservas del usuario con ID: ${id} obtenidas correctamente `,
            reservas
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener las reservas",
            error: error.message
        });
    }
}

export const getMyReservas = async (req, res) => {
    try {
        const userId = req.user.id;

        const reservas = await Reserva.findAll({
            where: { userId },
        });

        res.json({
            message: "Mis reservas obtenidas correctamente",
            reservas
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener mis reservas",
            error: error.message
        });
    }
};

export const createReserva = async (req, res, next) => {

    const { id: __, userId: _, estado, createdAt, funcionId, cantidadAsientos, precioTotal, ...restReserva } = req.body;

    const t = await sequelize.transaction();

    const userId = req.user.id;

    try {

        await existUserId(userId);
        await existFuncionId(funcionId);

        const funcion = await Funcion.findByPk(funcionId, {
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (funcion.asientosDisponibles < cantidadAsientos) {
            await t.rollback();
            return res.status(400).json({ msg: 'No hay suficientes asientos disponibles' });
        }

        funcion.asientosDisponibles -= cantidadAsientos;
        await funcion.save({ transaction: t });


        const reserva = await Reserva.create({
            userId,
            funcionId,
            cantidadAsientos,
            precioTotal: funcion.precio * cantidadAsientos,
            ...restReserva

        }, { transaction: t });

        await t.commit();
        res.json({
            message: "Reserva creada correctamente",
            reserva
        });

    } catch (error) {
        await t.rollback();
        res.status(500).json({
            message: "Error al crear la reserva",
            error: error.message
        });
        next(error);
    }

}


export const estadoReserva = async (req, res, next) => {

    const { id } = req.params;
    const t = await sequelize.transaction();

    try {

        await existReservaId(id);

        const reserva = await Reserva.findByPk(id, {
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        const funcion = await Funcion.findByPk(reserva.funcionId, {
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        funcion.asientosDisponibles += reserva.cantidadAsientos;
        await funcion.save({ transaction: t });

        await Reserva.update({ estado: false }, {
            where: { id },
            transaction: t
        })

        await t.commit();
        res.json({
            message: "Reserva cancelada correctamente",
        })

    } catch (error) {
        await t.rollback();
        res.status(500).json({
            message: "Error al actualizar el estado de la reserva",
            error: error.message
        });
        next(error);
    }
}