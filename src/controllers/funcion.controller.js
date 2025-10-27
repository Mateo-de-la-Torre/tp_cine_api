import { Funcion, Pelicula, Sala } from "../models/index.js";
import { existPeliculaId, existSalaId, existFuncionId, peliculaActiva, salaActiva, fechaHoraFuncion, calcularHoraFin, verificarSolapamiento } from "../helpers/db-validator.js";



export const getFuncion = async (req, res) => {
    try {
        const funciones = await Funcion.findAll({
            include: [
                {
                    model: Pelicula,
                    attributes: ["id", "titulo"],
                },
                {
                    model: Sala,
                    attributes: ["id", "numeroSala"],
                }
            ]
        });

        res.json({
            message: "Funciones obtenidas correctamente",
            funciones
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las funciones",
            error: error.message
        });
    }
}

export const getFuncionByPeliculaId = async (req, res) => {
    try {

        const { peliculaId } = req.params;

        await existPeliculaId(peliculaId);

        const funciones = await Funcion.findAll({
            where: { peliculaId }
        });

        res.json({
            message: "Funcion obtenida correctamente",
            funciones
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener la función",
            error: error.message
        });
    }
}


export const createFuncion = async (req, res) => {

    try {
        const { peliculaId, salaId, asientosDisponibles, fecha, hora, horaFin, ...restFuncion } = req.body;

        await peliculaActiva(peliculaId);
        await salaActiva(salaId);
        await fechaHoraFuncion(fecha, hora);

        const sala = await Sala.findByPk(salaId);
        const pelicula = await Pelicula.findByPk(peliculaId);

        const horaFinal = await calcularHoraFin(fecha, hora, pelicula.duracion);

        await verificarSolapamiento(salaId, fecha, hora, horaFinal);

        const funcion = await Funcion.create({
            peliculaId,
            salaId,
            asientosDisponibles: sala.capacidad,
            fecha,
            hora,
            horaFin: horaFinal,
            ...restFuncion
        });

        res.json({
            message: "Funcion creada correctamente",
            funcion
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al crear la función",
            error: error.message
        });
    }
}

export const updateFuncion = async (req, res) => {

    try {
        const { id } = req.params;

        const { id: _, peliculaId, salaId, fecha, hora, asientosDisponibles, horaFin, ...restFuncion } = req.body;

        await peliculaActiva(peliculaId);
        await salaActiva(salaId);
        await fechaHoraFuncion(fecha, hora);

        await existFuncionId(id);

        const sala = await Sala.findByPk(salaId);
        const pelicula = await Pelicula.findByPk(peliculaId);

        const horaFinal = await calcularHoraFin(fecha, hora, pelicula.duracion);

        await verificarSolapamiento(salaId, fecha, hora, horaFinal);

        await Funcion.update({
            peliculaId,
            salaId,
            asientosDisponibles: sala.capacidad,
            fecha,
            hora,
            horaFin: horaFinal,
            ...restFuncion
        }, {
            where: { id }
        });

        const updateFuncion = await Funcion.findByPk(id);

        res.json({
            message: "Funcion actualizada correctamente",
            updateFuncion
        })

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la función",
            error: error.message
        });
    }

}


export const estadoFuncion = async (req, res) => {
    try {
        const { id } = req.params;

        await existFuncionId(id);

        const funcion = await Funcion.findByPk(id);

        const newStatus = !funcion.estado;

        await Funcion.update({ estado: newStatus }, {
            where: { id }
        });

        const statusMessage = newStatus ?
            "Funcion activada correctamente" : "Funcion desactivada correctamente";

        res.json({
            message: statusMessage,
            newStatus: newStatus
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el estado de la función",
            error: error.message
        });
    }
}
