import Express from "express";
declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

declare global {
  interface JwtPayload {
    id?: string;
  }
}
