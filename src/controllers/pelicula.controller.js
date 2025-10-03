import { Pelicula } from "../models/pelicula.model.js";
import { existPeliculaId } from "../helpers/db-validator.js";


export const getPelicula = async (req, res) => {
    try {
        const peliculas = await Pelicula.findAll();
        res.json(peliculas);


    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}


export const getPeliculaId = async (req, res) => {
    try {
        const { id } = req.params;

        await existPeliculaId(id);

        const pelicula = await Pelicula.findByPk(id);

        res.json(pelicula);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

export const createPelicula = async (req, res) => {
    try {
        const { id: _, ...restPelicula } = req.body;

        const pelicula = await Pelicula.create({
            ...restPelicula
        });

        res.json({
            message: "Pelicula creada correctamente",
            pelicula
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

export const updatePelicula = async (req, res) => {
    try {
        const { id } = req.params;
        const { id: _, ...restPelicula } = req.body;

        await existPeliculaId(id);

        await Pelicula.update(restPelicula, {
            where: { id }
        });

        const updatePelicula = await Pelicula.findByPk(id);

        res.json({
            message: "Pelicula actualizada correctamente",
            updatePelicula
        });


    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}


export const estadoPelicula = async (req, res) => {

    try {
        const { id } = req.params;

        await existPeliculaId(id);

        const pelicula = await Pelicula.findByPk(id);

        const newStatus = !pelicula.estado;

        await Pelicula.update({ estado: newStatus }, {
            where: { id }
        });

        const statusMessage = newStatus ?
            `Pelicula ${pelicula.titulo} activada correctamente` : `Pelicula ${pelicula.titulo} desactivada correctamente`;

        res.json({
            message: statusMessage,
            newStatus: newStatus
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}