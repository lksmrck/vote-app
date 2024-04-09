import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
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
  const createdVote = await prisma.vote.create({
    data: req.body,
  });

  const options = req.body.options.map((o: any) => ({
    ...o,
    voteId: createdVote.id,
    creatorId: createdVote.creatorId,
  }));

  await prisma.option.createMany({
    data: options,
  });

  const createdOptions = await prisma.option.findMany({
    where: {
      voteId: createdVote.id,
    },
  });

  await prisma.userOption.createMany({
    data: createdOptions.map((o: any) => ({
      userId: createdVote.creatorId,
      optionId: o.id,
    })),
  });

  await prisma.userVote.create({
    data: {
      voteId: createdVote.id,
      userId: createdVote.creatorId,
    },
  });

  res.status(StatusCodes.CREATED).json(
    response.create(true, StatusCodes.CREATED, {
      ...createdVote,
      options: createdOptions,
    })
  );
});

const getVotesForUser = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        response.create(
          false,
          StatusCodes.UNAUTHORIZED,
          {},
          "No user was found in request data"
        )
      );
  }

  const { id } = req.user as User;
  const votes = await prisma.vote.findMany({
    where: {
      creatorId: id,
    },
    include: {
      options: true,
    },
  });

  res.status(StatusCodes.OK).json(response.create(true, StatusCodes.OK, votes));
});

export const VOTES = {
  get: getVote,
  create: createVote,
  getVotesForUser: getVotesForUser,
};
