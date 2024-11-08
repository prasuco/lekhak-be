import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const signJwt = async (expiresIn: string, data: {}) => {
  const token = await jwt.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: expiresIn,
  });
  return token;
};

export const verifyJwt = async (token: string) => {
  const verified = (await jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  )) as JwtPayload;

  return verified;
};
