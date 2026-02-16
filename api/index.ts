import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import connectDB from "@/config/database";
import { errorHandler } from "@/middleware/errorHandler";
import authRoutes from "@/routes/authRoutes";
import userRoutes from "@/routes/userRoutes";
import { config } from "@/config/env";

const app: Express = express();
const PORT = config.port || 5000;
const FRONTEND_URL = config.frontendUrl || "http://localhost:3000";

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler - removed the '*' parameter
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handling middleware
app.use(errorHandler);


// Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
//   console.log(`CORS enabled for: ${FRONTEND_URL}`);
// });

export default app;
