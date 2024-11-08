import { Router } from "express";
import { createOrgController, getOrgController } from "../controllers/org";

export const orgRouter = Router();

orgRouter.post("/", createOrgController);
orgRouter.get("/", getOrgController);
