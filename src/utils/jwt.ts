import jwt from "jsonwebtoken";
import { JwtPayload } from "@/types";
import { config } from "../config/env";

const JWT_SECRET = config.jwtSecret;
const JWT_EXPIRE = config.jwtExpire || "7d";

export const generateToken = (id: string, email: string): string => {
  const payload: JwtPayload = {
    id,
    email,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  } as any);
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.decode(token) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
