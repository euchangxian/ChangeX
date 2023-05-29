import "../loadEnvironment.mjs";
import db from "../db/conn.mjs";
import jwt from "jsonwebtoken";

const users = db.collection("users");

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).send({ message: "No token provided!" });
  }
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
};

const authJwt = {
  verifyToken
}

export default authJwt;

