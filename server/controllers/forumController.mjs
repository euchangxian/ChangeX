import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

// Topic Schema
// object_id
// topic_name - string

// Thread Schema
// object_id
// lastUpdated - Date object, stored as ISO Date. This will be updated when thread is created/ new comment is made under the thread
// userId - objectId of the user creating the thread, stored as a string
// topicId- topic that the thread is stored under, stored as a string
// title - title of the thread, stored as a string

// Comment Schema
// object_id
// date - Date object, stored as ISO Date
// userId - objectId of the user creating the comment, stored as a string
// threadId - id of the thread the comment is made under
// body - string

// post request
const addThread = async (req, res) => {
  const { date, userId, topicId, title } = req.body;

  db.threads
    .insertOne({
      lastUpdated: new Date(date),
      userId: userId,
      topicId: topicId,
      title: title,
    })
    .then((result) => {
      console.log("Thread added successfully!");
      res.status(200).send({ message: `Thread added successfully!` });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error });
    });
};

// get request
const getThreads = async (req, res) => {
  const { topicId } = req.params;

  try {
    const cursor = db.threads.find({ topicId: topicId });
    const transactions = await cursor.sort({ lastUpdated: -1 }).toArray();
    console.log("Successfully retrieved threads!");
    res.status(200).send(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

// post request
const updateThreadLastUpdated = async (req, res) => {
  const { id, date } = req.params;

  try {
    const result = await db.threads.updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: { lastUpdated: new Date(date) } }
    );
    console.log(result);
    if (result.modifiedCount === 0) {
      console.log(`No such thread`);
      res.status(400).send({ message: `No thread found` });
    } else {
      console.log("Successfully updated thread last updated date!");
      res.status(200).send({ message: `Successfully updated thread last updated date` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

// delete request. Will require a separate function to delete all comments under this thread.
const deleteThread = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.transactions.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      console.log(`No thread with the id ${id}`);
      res.status(404).send({ message: `No thread found with id: ${id}` });
    } else {
      console.log("Successfully deleted thread!");
      res
        .status(200)
        .send({ message: `Successfully deleted thread with id: ${id}` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};
