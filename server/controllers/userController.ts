import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { response } from "../utils/response";
import { catchAsync } from "../middlewares/catchAsync";

const prisma = new PrismaClient();

const createUser = catchAsync(async (req: Request, res: Response) => {
  await prisma.user.create({
    data: req.body,
  });
  res
    .status(StatusCodes.CREATED)
    .json(response.create(true, StatusCodes.CREATED));
});

const loginUser = catchAsync(async (req: Request, res: Response) => {});

export const USERS = {
  create: createUser,
  login: loginUser,
};
