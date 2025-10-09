import { application, Router } from "express";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.use(arcjetProtection, verifyJWT);

router.route("/contacts").get(getAllContacts);

router.route("/chats").get(getChatPartners);

router.route("/:id").get(getMessagesByUserId);

router.route("/send/:id").post(upload.single("image"), sendMessage);

export default router;
