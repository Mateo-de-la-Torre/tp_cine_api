import { Router } from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import peliculaRouter from "./pelicula.routes.js";
import funcionRouter from "./funcion.routes.js";
import salaRouter from "./sala.routes.js";



export const mainRouter = Router();


mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/pelicula", peliculaRouter);
mainRouter.use("/funcion", funcionRouter);
mainRouter.use("/sala", salaRouter);