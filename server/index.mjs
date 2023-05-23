import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import authRouter from "./routes/auth.mjs";
import MongoStore from "connect-mongo";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
  })
);

// TODO: Load routes
// app.post("/signin", (req, res) => {
//   console.log(req.body);
//   res.sendStatus(201);
// });
// app.post("/signup", (req, res) => {
//   console.log(req.body);
//   res.sendStatus(201);
// });

app.use("/", authRouter);


// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occurred.");
})

app.get("/", (req, res) => {
  console.log("Hello \"/\"");
  res.status(201).send("User logged in successfully");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(
    `Server is running on port: ${PORT}`); // Wrap string within ` (backtick) instead of " for string formatting
});