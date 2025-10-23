import { Router } from "express";
import { getPelicula, getPeliculaId, createPelicula, updatePelicula, estadoPelicula } from "../controllers/pelicula.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { isAdminRole } from "../middlewares/validar-isAdmin.js";



const peliculaRouter = Router();

peliculaRouter.get("/", [
], getPelicula);

peliculaRouter.get("/:id", [
], getPeliculaId);

peliculaRouter.post("/", [
    validarJWT,
    isAdminRole
], createPelicula);

peliculaRouter.put("/:id", [
    validarJWT,
    isAdminRole
], updatePelicula);

peliculaRouter.patch("/:id", [
    validarJWT,
    isAdminRole
], estadoPelicula);

export default peliculaRouter;

