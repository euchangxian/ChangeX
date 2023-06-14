import express from "express";
import authJwt from "../middlewares/authJwt.mjs";
import { getUsers, checkFriend, addFriend } from "../controllers/friendController.mjs";

const router = express.Router();

router.get("/getallusers", authJwt.verifyToken, getUsers);

router.get("/checkfriend/:friendId", authJwt.verifyToken, checkFriend);

router.post("/addfriend", authJwt.verifyToken, addFriend);

export default router;
