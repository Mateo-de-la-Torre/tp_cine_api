import { Router } from "express";
import { getUser, getUserId, updateUser, estadoUser, updateUserRole } from "../controllers/user.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { isAdminRole, isSuperAdminRole } from "../middlewares/validar-isAdmin.js";


const userRouter = Router();

userRouter.get("/", [
    validarJWT,
    isAdminRole
], getUser);

userRouter.get("/:id", [
    validarJWT,
    isAdminRole
], getUserId);

// userRouter.post("/", createUser);
userRouter.put("/profile", [
    validarJWT
], updateUser);

userRouter.patch("/:id", [
    validarJWT,
    isSuperAdminRole
], estadoUser);

userRouter.put("/:id/role", [
    validarJWT,
    isSuperAdminRole
], updateUserRole);

export default userRouter;