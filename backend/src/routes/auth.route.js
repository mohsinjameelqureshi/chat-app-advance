import { Router } from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = Router();
router.use(arcjetProtection);

router.route("/signup").post(signup);

router.route("/login").post(login);

// protected routes

router.route("/logout").post(verifyJWT, logout);

router
  .route("/update-profile")
  .put(verifyJWT, upload.single("profilePic"), updateProfile);

router
  .route("/check")
  .get(verifyJWT, (req, res) => res.status(200).json(req.user));
export default router;
