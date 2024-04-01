import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpException } from "../exceptions/root";

// global error middleware
export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);
  console.log(err.errors);
  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message || "Internal Server Error",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    error: req.app.get("env") === "development" ? err.errors.message : {},
    // error: req.app.get("env") === "development" ? err.errors.stack : {},
  });
};
