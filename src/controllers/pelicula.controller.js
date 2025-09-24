import { Pelicula } from "../models/pelicula.model.js";


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

        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({
                message: `No existe un usuario con el id: ${id} `
            });
        }

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

        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({
                message: `No existe una película con el id: ${id}`
            });
        }

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