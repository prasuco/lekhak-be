import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt";

dotenv.config();

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "token doesnot exist" });
    }

    const bearerToken = token.split(" ")[1];
    let verified = await verifyJwt(bearerToken);

    req.id = verified?.id;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "something went wrong" });
  }
};
