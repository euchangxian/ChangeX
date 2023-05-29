import express from "express";
import verifySignUp from "../middlewares/verifySignUp.mjs";
import { signup, login, logout } from "../controllers/authController.mjs";

const router = express.Router();
router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
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

router.post(
  "/logout",
  logout
);

export default router;