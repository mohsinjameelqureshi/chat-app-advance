import { Router } from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/signup").post(signup);

router.route("/login").post(login);

// protected routes

router.route("/logout").post(verifyJWT, logout);

router
  .route("/update-profile")
  .put(upload.single("profilePic"), verifyJWT, updateProfile);

router
  .route("/check")
  .get(verifyJWT, (req, res) => res.status(200).json(req.user));
export default router;
