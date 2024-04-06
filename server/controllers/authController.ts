import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { response } from "../utils/response";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import { catchAsync } from "../middlewares/catchAsync";

const prisma = new PrismaClient();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const upsertUser = () => {};

const googleLogin = catchAsync((req: Request, res: Response) => {
  const token = req.body;
});

export const AUTH = {
  googleLogin: googleLogin,
};
