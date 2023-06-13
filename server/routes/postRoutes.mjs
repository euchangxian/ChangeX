import express from "express";
import authJwt from "../middlewares/authJwt.mjs";
import { addPost } from "../controllers/postController.mjs";

const router = express.Router();

router.post("/addpost", authJwt.verifyToken, addPost);

export default router;