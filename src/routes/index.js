import { Router } from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";



export const mainRouter = Router();


mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
