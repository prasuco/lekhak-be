import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const signJwt = async (expiresIn: string, data: {}) => {
  const token = await jwt.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: expiresIn,
  });
  return token;
};
