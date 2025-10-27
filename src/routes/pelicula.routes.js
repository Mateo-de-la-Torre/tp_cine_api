import { Router } from "express";
import { getPelicula, getPeliculaByTitulo, createPelicula, updatePelicula, estadoPelicula, getPeliculaByEstado } from "../controllers/pelicula.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { isAdminRole, isSuperAdminRole } from "../middlewares/validar-isAdmin.js";



const peliculaRouter = Router();

peliculaRouter.get("/", [
], getPelicula);

peliculaRouter.get("/public", [
], getPeliculaByEstado);

// peliculaRouter.get("/:id", [
// ], getPeliculaId);

peliculaRouter.get("/search", [
], getPeliculaByTitulo);

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
    isSuperAdminRole
], estadoPelicula);

export default peliculaRouter;

