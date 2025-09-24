import { Router } from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import peliculaRouter from "./pelicula.routes.js";



export const mainRouter = Router();


mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/pelicula", peliculaRouter);
