import express from "express";
const router = express.Router();
import db from "../db/conn.mjs";
// Schema.
// *date - Date object
// *userId - objectId
// category - string
// amount - double ( positive <=> incoming transaction, negative <=> outgoing transaction )
// description - string

const addTransaction = (req, res) => {
  const { userId } = req;
  const { date, category, description, amount } = req.body;

  db.transactions.insertOne({
    date: new Date(date),
    userId: userId,
    category: category,
    amount: amount,
    description: description
  }).then(result => {
    res.status(200).send({ message: `Transaction added successfully!` });
  }).catch(error => {
    console.log(error);
    res.status(500).send({ message: error });
  });
};

export { addTransaction };