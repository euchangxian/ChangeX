import express from "express";
import authJwt from "../middlewares/authJwt.mjs";
import { getUsers } from "../controllers/friendController.mjs";

const router = express.Router();

router.get("/getallusers", authJwt.verifyToken, getUsers);

export default router;
