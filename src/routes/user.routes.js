import { Router } from "express";
import { getUser, createUser, getUserId, updateUser, estadoUser } from "../controllers/user.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { isAdminRole } from "../middlewares/validar-isAdmin.js";


const userRouter = Router();

userRouter.get("/", [
    validarJWT,
    isAdminRole
], getUser);
userRouter.get("/:id", getUserId);

userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);

userRouter.patch("/:id", estadoUser);

export default userRouter;