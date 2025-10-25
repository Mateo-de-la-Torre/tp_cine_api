import { getFuncion, createFuncion, updateFuncion, estadoFuncion, getFuncionByPeliculaId } from "../controllers/funcion.controller.js";
import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { isAdminRole } from "../middlewares/validar-isAdmin.js";


const funcionRouter = Router();

funcionRouter.get("/", [
    validarJWT
], getFuncion);

funcionRouter.get("/:peliculaId", [
    validarJWT
], getFuncionByPeliculaId);

funcionRouter.post("/", [
    validarJWT,
    isAdminRole
], createFuncion);

funcionRouter.put("/:id", [
    validarJWT,
    isAdminRole
], updateFuncion);

funcionRouter.patch("/:id", [
    validarJWT,
    isAdminRole
], estadoFuncion);


export default funcionRouter;