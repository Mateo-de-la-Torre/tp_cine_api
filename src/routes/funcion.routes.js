import { getFuncion, createFuncion, getFuncionById, updateFuncion, estadoFuncion } from "../controllers/funcion.controller.js";
import { Router } from "express";


const funcionRouter = Router();

funcionRouter.get("/", getFuncion);
funcionRouter.get("/:id", getFuncionById);
funcionRouter.post("/", createFuncion);
funcionRouter.put("/:id", updateFuncion);
funcionRouter.patch("/:id", estadoFuncion);


export default funcionRouter;