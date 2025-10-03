import { Router } from "express";
const router = Router();

router.route("/signup").get((req, res) => {
  res.send("SignUp Endpoin");
});

export default router;
