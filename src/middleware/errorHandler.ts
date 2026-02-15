import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
  }
}

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.statusCode,
    });
  } else {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({
      success: false,
      message,
      code: 500,
    });
  }
};
