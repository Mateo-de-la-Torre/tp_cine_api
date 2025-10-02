import { getFuncion, createFuncion, getFuncionById, updateFuncion } from "../controllers/funcion.controller.js";
import { Router } from "express";


const funcionRouter = Router();

funcionRouter.get("/", getFuncion);
funcionRouter.get("/:id", getFuncionById);
funcionRouter.post("/", createFuncion);
funcionRouter.put("/:id", updateFuncion);


export default funcionRouter;