import { Router } from "express";
import { getPelicula, getPeliculaId, createPelicula, updatePelicula, estadoPelicula } from "../controllers/pelicula.controller.js";



const peliculaRouter = Router();

peliculaRouter.get("/", getPelicula);
peliculaRouter.get("/:id", getPeliculaId);
peliculaRouter.post("/", createPelicula);
peliculaRouter.put("/:id", updatePelicula);
peliculaRouter.patch("/:id", estadoPelicula);

export default peliculaRouter;

