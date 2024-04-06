import express from "express";
import { VOTES } from "../controllers/voteController";
import { USERS } from "../controllers/userController";
import { AUTH } from "../controllers/authController";

const router = express.Router();

router.route("/vote").get(VOTES.get).post(VOTES.create);

// router.post("/register", USERS.create);
// router.post("/login", USERS.login);

router.post("google-login", AUTH.googleLogin);

export default router;
