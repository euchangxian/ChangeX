import db from "../db/conn.mjs";

// Schema.
// date - Date object, stored as ISO Date
// username - name of the author, stored as a string
// userId - objectId of the user adding the transaction, stored as a string
// body - string

const addPost = async (req, res) => {
  const { date, username, userId, transactionId, body } = req.body;

  db.posts
    .insertOne({
      date: new Date(date),
      username: username,
      userId: userId,
      transactionId: transactionId,
      body: body,
    })
    .then((result) => {
      console.log("Post added successfully!");
      res.status(200).send({ message: `Post added successfully!` });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error });
    });
};

export { addPost };
