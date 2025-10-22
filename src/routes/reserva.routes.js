import { Router } from "express";
import { createReserva, estadoReserva, getMyReservas, getReservas, getReservasByUserId } from "../controllers/reserva.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { isAdminRole } from "../middlewares/validar-isAdmin.js";



const reservaRouter = Router();


reservaRouter.post("/", [
    validarJWT
], createReserva);

reservaRouter.get("/my-reservas", [
    validarJWT
], getMyReservas);

reservaRouter.get("/", [
    validarJWT,
    isAdminRole
], getReservas);

reservaRouter.get("/:id", [
    validarJWT,
    isAdminRole
], getReservasByUserId);

reservaRouter.patch("/:id", [
    validarJWT
], estadoReserva);


export default reservaRouter;