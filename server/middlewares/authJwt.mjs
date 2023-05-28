import "../loadEnvironment.mjs";
import db from "../db/conn.mjs";
import jwt from "jsonwebtoken";

const users = db.colletion("users");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status.send({ message: "No token provided!" });
  }
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken
}

export default authJwt;

