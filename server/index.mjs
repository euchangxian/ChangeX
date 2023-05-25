import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import authRouter from "./routes/auth.mjs";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(cookieParser(process.env.SECRET));
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
  const { userId, username } = req.user;
  console.log(req.isAuthenticated());
  res.send(`User ${username} signed in successfully!`);
});

app.get("/signin", (req, res) => {
  console.log("Hello signin");
  res.send("Sign In page");
});

app.get("/signup", (req, res) => {
  console.log("Hello signup");
  res.send("Sign Up page")
});

// Start the Express server
app.listen(PORT, () => {
  console.log(
    `Server is running on port: ${PORT}`); // Wrap string within ` (backtick) instead of " for string formatting
});