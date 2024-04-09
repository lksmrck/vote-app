import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { response } from "../utils/response";
import { catchAsync } from "../middlewares/catchAsync";
import passport from "passport";

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const CLIENT_URL = "http://localhost:5173/";

const googleLogin = (req: Request, res: Response) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
};

const googleLoginCallback = (req: Request, res: Response) => {
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "auth/login/failed",
  })(req, res);
};

const googleLoginSuccess = catchAsync(async (req: Request, res: Response) => {
  if (req.user) {
    res
      .status(StatusCodes.OK)
      .json(
        response.create(
          true,
          StatusCodes.OK,
          { user: req.user, isSuccess: true },
          ""
        )
      );
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        response.create(false, StatusCodes.UNAUTHORIZED, {}, "Log in failure")
      );
  }
});

const loginFailed = catchAsync(async (req: Request, res: Response) => {
  res
    .status(StatusCodes.UNAUTHORIZED)
    .json(
      response.create(false, StatusCodes.UNAUTHORIZED, {}, "Log in failure")
    );
});

const logout = catchAsync(async (req: Request, res: Response) => {
  req.logout({}, (err) => console.log(err));
  res.redirect(CLIENT_URL);
});

export const AUTH = {
  googleLogin,
  googleLoginCallback,
  googleLoginSuccess,
  loginFailed,
};
