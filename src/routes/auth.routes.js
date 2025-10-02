import { Router } from "express";
import { register, login, verifyToken } from "../controllers/auth.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";


const authRouter = Router();


authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.get("/verify-token", [validarJWT], verifyToken);


export default authRouter;