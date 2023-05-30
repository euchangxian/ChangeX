import express from "express";
import authJwt from "../middlewares/authJwt.mjs";
import { addTransaction } from "../controllers/transactionController.mjs";

const router = express.Router();

router.post(
  "/addtransaction",
  authJwt.verifyToken,
  addTransaction
);

export default router;