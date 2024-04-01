import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { response } from "../utils/response";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

const prisma = new PrismaClient();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
