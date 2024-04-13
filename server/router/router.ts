import express from "express";
import { VOTES } from "../controllers/http/voteController";
import { AUTH } from "../controllers/http/authController";
import passport from "passport";

const router = express.Router();

router.route("/vote").get(VOTES.get).post(VOTES.create);

router.get("/votes/:id", VOTES.getVotesForUser);

// Google auth
router.get("/auth/google/login", AUTH.googleLogin);
router.get("/auth/google/login/callback", AUTH.googleLoginCallback);
router.get("/auth/google/login/success", AUTH.googleLoginSuccess);
router.get("/auth/login/failed", AUTH.loginFailed);

export default router;
