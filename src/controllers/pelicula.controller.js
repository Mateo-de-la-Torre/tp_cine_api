import { Pelicula } from "../models/pelicula.model.js";
import { existPeliculaId } from "../helpers/db-validator.js";
import { Funcion } from "../models/funcion.model.js";
import { Op } from "sequelize";


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

export const getPeliculaByTitulo = async (req, res) => {
    try {
        const { titulo } = req.query;

        const peliculas = await Pelicula.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${titulo}%`
                }
            }
        });

        if (peliculas.length === 0) {
            return res.status(404).json({
                error: 'No se encontraron películas con ese título'
            });
        }

        res.json({
            message: `Se encontraron ${peliculas.length} película(s)`,
            peliculas
        });

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

        const funcion = await Funcion.findOne({ where: { peliculaId: id, estado: true } });

        if (funcion) {
            return res.status(400).json({
                message: "No se puede desactivar la pelicula porque tiene funciones activas, primero debes desactivar las funciones"
            });
        }

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