import type { Request, Response } from "express";
import CreateUserSchema from "../dtos/createUserSchema";
import { db } from "../../prisma/prisma";
import { hashPassword } from "../utils/password";

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
    res.status(500).json({ succes: false, message: "something went wrong." });
  }
};
