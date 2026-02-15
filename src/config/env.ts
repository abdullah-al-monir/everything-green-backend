import dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || defaultValue || "";
};

export const config = {
  // Server
  port: parseInt(getEnv("PORT", "5000")),
  nodeEnv: getEnv("NODE_ENV", "development"),

  // Database
  mongodbUri: getEnv("MONGODB_URI"),

  // JWT
  jwtSecret: getEnv("JWT_SECRET"),
  jwtExpire: getEnv("JWT_EXPIRE", "7d"),

  // Frontend
  frontendUrl: getEnv("FRONTEND_URL", "http://localhost:5173"),

};