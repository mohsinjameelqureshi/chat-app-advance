import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/logout").post(verifyJWT, logout);

export default router;
