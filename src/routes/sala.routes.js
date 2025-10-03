import { Router } from "express";
import { getSala, createSala, estadoSala } from "../controllers/sala.controller.js";


const salaRouter = Router();


salaRouter.get("/", getSala);
salaRouter.post("/", createSala);
salaRouter.patch("/:id", estadoSala);


export default salaRouter;