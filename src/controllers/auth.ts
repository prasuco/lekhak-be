import type { Request, Response } from "express";
import { db } from "../../prisma/prisma";
import { hashPassword, matchPassword } from "../utils/password";
import { signJwt } from "../utils/jwt";
import CreateUserSchema from "../dtos/createUserSchema";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const isValidSchema = CreateUserSchema.safeParse(req.body);

    if (!isValidSchema.success) {
      throw new Error("not valid schema");
    }

    const userExists = await db.user.findUnique({
      where: { email: isValidSchema.data.email },
    });

    if (userExists) {
      return res.status(404).json({
        success: false,
        message: "user with that email alread exists",
      });
    }
    const hashedPassword = await hashPassword(isValidSchema.data.password);

    const newUser = await db.user.create({
      data: { email: isValidSchema.data.email, password: hashedPassword },
    });

    return res
      .status(201)
      .json({ success: true, message: "user created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ succes: false, message: "something went wrong." });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const isValidSchema = CreateUserSchema.safeParse(req.body);

    if (!isValidSchema.success) {
      throw new Error("not valid schema");
    }

    const userExists = await db.user.findUnique({
      where: { email: isValidSchema.data.email },
    });

    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "user doesnot exist" });
    }

    const passwordMilchha = await matchPassword(
      isValidSchema.data.password,
      userExists.password,
    );

    if (!passwordMilchha) {
      return res
        .status(403)
        .json({ success: false, message: "password didnt match" });
    }

    const jwtToken = await signJwt("24h", {
      id: userExists.id,
      role: userExists.role,
      email: userExists.email,
    });

    return res.status(200).json({
      success: true,
      message: "user logged in successfully",
      data: { token: jwtToken },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ succes: false, message: "something went wrong." });
  }
};

export const whoAmIController = async (req: Request, res: Response) => {
  const userExists = await db.user.findUnique({
    where: { id: req.id },
    select: { email: true, fullName: true, role: true },
  });

  if (!userExists) {
    return res.status(404).json({ success: false, message: "user not found" });
  }
  return res.status(200).json({ success: true, data: userExists });
};
