import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import authRouter from "./routes/auth.mjs";

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
app.use("/", authRouter); // Authentication route


// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occurred.");
})

app.get("/", (req, res) => {
  console.log("Hello \"/\"");
  console.log(req.session);
  res.status(201).send("User logged in successfully");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(
    `Server is running on port: ${PORT}`); // Wrap string within ` (backtick) instead of " for string formatting
});