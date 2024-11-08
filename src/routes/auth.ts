import { Router } from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/auth";

export const authRouter = Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
