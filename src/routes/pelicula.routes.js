import { Router } from "express";
import { getPelicula, getPeliculaId, createPelicula, updatePelicula } from "../controllers/pelicula.controller.js";



const peliculaRouter = Router();

peliculaRouter.get("/", getPelicula);
peliculaRouter.get("/:id", getPeliculaId);
peliculaRouter.post("/", createPelicula);
peliculaRouter.put("/:id", updatePelicula);

export default peliculaRouter;

