import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { response } from "../utils/response";
import { VoteCreateSchema } from "../validation/schema";
import { catchAsync } from "../middlewares/catchAsync";

const prisma = new PrismaClient().$extends({
  query: {
    vote: {
      create: ({ args, query }) => {
        args.data = VoteCreateSchema.parse(args.data);
        return query(args);
      },
    },
  },
});

const getVote = catchAsync(async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json("Hello world");
});

const createVote = catchAsync(async (req: Request, res: Response) => {
  // throw new HttpException("test message", 0, 500, new Error("test"));
  await prisma.vote.create({
    data: req.body,
  });
  res
    .status(StatusCodes.CREATED)
    .json(response.create(true, StatusCodes.CREATED, req.body));
});

const getVotesForUser = catchAsync(async (req: Request, res: Response) => {});

export const VOTES = {
  get: getVote,
  create: createVote,
};
