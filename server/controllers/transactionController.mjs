import express from "express";
const router = express.Router();
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
// Schema.
// date - Date object, stored as ISO Date
// userId - objectId of the user adding the transaction, stored as a string
// category - string
// amount - double ( positive <=> incoming transaction, negative <=> outgoing transaction )
// description - string

const addTransaction = async (req, res) => {
  const { date, userId, category, description, amount } = req.body;

  db.transactions.insertOne({
    date: new Date(date),
    userId: userId,
    category: category,
    amount: amount,
    description: description
  }).then(result => {
    console.log("Transaction added successfully!");
    res.status(200).send({ message: `Transaction added successfully!` });
  }).catch(error => {
    console.log(error);
    res.status(500).send({ message: error });
  });
};

const getTransactions = async (req, res) => {
  const { userId } = req.body;

  console.log(userId);
  try {
    const cursor = db.transactions.find({ userId: userId });
    const transactions = await cursor.sort({ date: -1 }).toArray();
    console.log("Successfully retrieved transactions!");
    res.status(200).send(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const result = await db.transactions.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      console.log(`No transactions with the id ${id}`);
      res.status(404).send({ message: `No transaction found with id: ${id}` });
    } else {
      console.log("Successfully deleted transaction!");
      res.status(200).send({ message: `Successfully deleted transaction with id: ${id}` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};


export { addTransaction, getTransactions, deleteTransaction };
