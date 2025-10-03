import { existNumeroSala, existSalaId } from "../helpers/db-validator.js";
import { Sala } from "../models/sala.model.js";


export const getSala = async (req, res) => {

    try {
        const salas = await Sala.findAll();

        res.json({
            message: "Salas obtenidas correctamente",
            salas
        });

    } catch (error) {
        res.status(400).json({
            message: "Error al obtener las salas",
            error: error.message
        });
    }
}


export const createSala = async (req, res) => {

    try {
        const { numeroSala, ...restSala } = req.body;

        await existNumeroSala(numeroSala);

        const sala = await Sala.create(
            { ...restSala, numeroSala }
        );

        res.json({
            message: "Sala creada correctamente",
            sala
        });

    } catch (error) {
        res.status(400).json({
            message: "Error al crear la sala",
            error: error.message
        });
    }
}

export const estadoSala = async (req, res) => {
    try {
        const { id } = req.params;

        await existSalaId(id);

        const sala = await Sala.findByPk(id);

        const newStatus = !sala.estado;

        await Sala.update({ estado: newStatus }, {
            where: { id }
        });

        const statusMessage = newStatus ?
            `Sala ${sala.numeroSala} activada correctamente` : `Sala ${sala.numeroSala} desactivada correctamente`;

        res.json({
            message: statusMessage,
            newStatus: newStatus
        });


    } catch (error) {
        res.status(400).json({
            message: "Error al actualizar el estado de la sala",
            error: error.message
        });
    }
}