import "./loadEnvironment.mjs";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.mjs";
import authJwt from "./middlewares/authJwt.mjs";

const PORT = process.env.PORT || 5050;
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
  })
);
app.use(bodyParser.json());
app.use(cookieParser(process.env.SECRET));

// TODO: Load routes
// status 200 is sent for successful login/signup. 
// status 400 is sent for incorrect username/password.
// status 500 is sent for errors.
app.use(authRoutes);

app.get("/", (req, res) => {
  console.log("Hello \"/\"");
  res.send("/ page");
});

app.post("/newtransaction", authJwt.verifyToken, (req, res) => {
  const { username, userId } = req;
  console.log(`username: ${username}, userId: ${userId}`);
  res.status(200).send("OK");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(
    `Server is running on port: ${PORT}`); // Wrap string within ` (backtick) instead of " for string formatting
});