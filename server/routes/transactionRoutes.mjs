import express from "express";
import authJwt from "../middlewares/authJwt.mjs";
import { addTransaction, getTransactions, deleteTransaction } from "../controllers/transactionController.mjs";

const router = express.Router();

router.post(
  "/addtransaction",
  authJwt.verifyToken,
  addTransaction
);

router.get(
  "/transactions",
  authJwt.verifyToken,
  getTransactions
)

router.delete(
  "/transactions/:id",
  authJwt.verifyToken,
  deleteTransaction
);


export default router;