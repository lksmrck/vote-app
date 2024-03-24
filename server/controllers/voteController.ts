import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const getVote = async (req: Request, res: Response) => {
  try {
    res.status(StatusCodes.OK).json("Hello world");
  } catch (error: any) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

export const VOTES = {
  get: getVote,
};
