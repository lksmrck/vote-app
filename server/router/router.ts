import express from "express";
import { VOTES } from "../controllers/voteController";

const router = express.Router();

router.get("/vote", VOTES.get);

export default router;
