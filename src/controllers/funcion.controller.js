import { Funcion } from "../models/funcion.model.js";
import { existPeliculaId, existSalaId } from "../helpers/db-validator.js";


export const getFuncion = async (req, res) => {
    try {
        const funciones = await Funcion.findAll();

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

export const getFuncionById = async (req, res) => {
    try {
        const { id } = req.params;
        const funcion = await Funcion.findByPk(id);

        res.json({
            message: "Funcion obtenida correctamente",
            funcion
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
        const { peliculaId, salaId, ...restFuncion } = req.body;

        await existPeliculaId(peliculaId);
        await existSalaId(salaId);

        const funcion = await Funcion.create({
            peliculaId,
            salaId,
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
        const { id: _, ...restFuncion } = req.body;

        await existPeliculaId(restFuncion.peliculaId);
        await existSalaId(restFuncion.salaId);

        const funcion = await Funcion.findByPk(id);
        if (!funcion) {
            return res.status(404).json({
                message: `No existe una función con el id: ${id}`
            });
        }

        await Funcion.update(restFuncion, {
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