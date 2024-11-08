import type { Request, Response } from "express";
import { db } from "../../prisma/prisma";
import CreateOrgSchema from "../dtos/createOrgSchema";

export const createOrgController = async (req: Request, res: Response) => {
  const validSchema = CreateOrgSchema.safeParse(req.body);

  if (!validSchema.success) {
    return res
      .status(400)
      .json({ success: false, message: "schema validation error" });
  }

  const userHasOrg = await db.user.findUnique({
    where: { id: req.id },
    include: { org: true },
  });

  if (userHasOrg?.org) {
    return res
      .status(400)
      .json({ success: false, message: "user cannot create org" });
  }

  const org = await db.organization.create({
    data: {
      name: validSchema.data.name,
      employees: { connect: { id: req.id } },
      config: { create: {} },
    },
  });
  return res.status(201).json({
    success: true,
    message: "organization created successfully.",
    data: org,
  });
};

export const getOrgController = async (req: Request, res: Response) => {
  const user = await db.user.findUnique({
    where: { id: req.id },
    include: { org: true },
  });

  return res.status(200).json({ success: true, data: user?.org });
};
