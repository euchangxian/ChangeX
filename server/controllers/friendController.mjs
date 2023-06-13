import db from "../db/conn.mjs";

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

export { getUsers };
