import { Router } from "express";
import { getSala, createSala, estadoSala } from "../controllers/sala.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { isAdminRole, isSuperAdminRole } from "../middlewares/validar-isAdmin.js";


const salaRouter = Router();


salaRouter.get("/", [
    validarJWT,
    isAdminRole
], getSala);

salaRouter.post("/", [
    validarJWT,
    isAdminRole
], createSala);

salaRouter.patch("/:id", [
    validarJWT,
    isSuperAdminRole
], estadoSala);


export default salaRouter;