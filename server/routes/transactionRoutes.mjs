import express from "express";
import authJwt from "../middlewares/authJwt.mjs";
import { addTransaction, getTransactions, getSpendingByMonthYear, deleteTransaction } from "../controllers/transactionController.mjs";

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
);

router.get(
  "/getspending/:date",
  authJwt.verifyToken,
  getSpendingByMonthYear
);

router.delete(
  "/transactions/:id",
  authJwt.verifyToken,
  deleteTransaction
);


export default router;