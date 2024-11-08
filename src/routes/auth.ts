import { Router } from "express";
import {
  loginUserController,
  registerUserController,
  whoAmIController,
} from "../controllers/auth";
import { isAuthenticated } from "../middlewares/authenticated";

export const authRouter = Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
authRouter.get("/whoami", isAuthenticated, whoAmIController);
