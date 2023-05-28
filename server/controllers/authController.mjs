import "../loadEnvironment.mjs";
import db from "../db/conn.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const users = db.collection("users");

const saltRounds = 10;

const signup = (req, res) => {
  const { username, password } = req.body;
  // checking for duplicate username is done by the verifySignUp middleware. Hence we can assume no duplicate
  // usernames will be passed into the authController.
  bcrypt.hash(password, saltRounds).then(hashed => {
    const newUser = {
      username: username,
      password: hashed
    };
    users.insertOne(newUser).then(res => {
      console.log(`User ${newUser.username} registered successfully!`);
      res.status(200).send({ message: "User was registered successfully!" });
    }).catch(error => {
      console.log(error);
      res.status(500).send({ message: error });
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  users.findOne({ username: username }).then(user => {
    if (!user) {
      console.log("User not found.");
      return res.status(400).send({ message: "User not found." });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        console.log("Incorrect password!")
        return res.status(400).send({
          accessToken: null,
          message: "Incorrect password!"
        });
      }
      const token = jwt.sign({ id: user._id.toString() }, process.env.SECRET, {
        expiresIn: 24 * 60 * 60 // 24 hours
      });

      // sends the token back to the client.
      res.status(200).send({
        id: user._id,
        username: user.username,
        accessToken: token
      });
    }).catch(error => {
      console.log(error);
      res.status(500).send({ message: error });
    });
  });
};

export { signup, login };
