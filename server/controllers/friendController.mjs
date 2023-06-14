import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const getUsers = async (req, res) => {
  try {
    const users = await db.users
      .find()
      .project({ password: 0 })
      .sort({ username: 1 })
      .toArray(); // Fetch only username and _id fields
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

const checkFriend = async (req, res) => {
  const { friendId } = req.params;
  const { userId } = req.body;
  db.users
    .findOne({
      $and: [{ _id: new ObjectId(userId) }, { friends: friendId }],
    })
    .then((result) => {
      if (result) {
        console.log("true");
        res.status(200).json(true);
      } else {
        console.log("false");
        res.status(200).json(false);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error });
    });
};

const addFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  db.users
    .updateOne(
      {
        _id: new ObjectId(userId),
      },
      { $push: { friends: friendId } }
    )
    .then((result) => {
      console.log("Friend added successfully!");
      res.status(200).send({ message: `Friend added successfully!` });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error });
    });
};

export { getUsers, checkFriend, addFriend };
