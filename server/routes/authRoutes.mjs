import express from "express";
import verifySignUp from "../middlewares/verifySignUp.mjs";
import { signup, login } from "../controllers/authController.mjs";

const router = express.Router();
router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  verifySignUp.checkDuplicateUsername,
  signup
);

router.post(
  "/login/password",
  login
);

export default router;