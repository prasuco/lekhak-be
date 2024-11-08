import { Router } from "express";
import { registerUserController } from "../controllers/auth";

export const authRouter = Router();

authRouter.post("/register", registerUserController);
