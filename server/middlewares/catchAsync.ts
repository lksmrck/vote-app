import { NextFunction, Request, Response } from "express";

// catchuje errory v async controller funkcích a přeposílá je do global error middleware
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
