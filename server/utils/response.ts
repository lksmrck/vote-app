import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../models/apiResponse";

const create = (
  isSuccess: boolean,
  statusCode: StatusCodes,
  data = {},
  errorMessage = ""
): ApiResponse => ({ isSuccess, statusCode, data, errorMessage });

export const response = {
  create,
};
