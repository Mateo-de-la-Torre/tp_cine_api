import { Router } from "express";
import { getUser, createUser, getUserId, updateUser, estadoUser } from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.get("/", getUser);
userRouter.get("/:id", getUserId);

userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);

userRouter.patch("/:id", estadoUser);

export default userRouter;