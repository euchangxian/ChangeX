import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import "./loadEnvironment.mjs";
import passport from "passport";
import authRouter from "./routes/auth.mjs";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 5050;
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
  })
);
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "public")));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: MongoStore.create({
      mongoUrl: process.env.ATLAS_URI,
      touchAfter: 24 * 3600 // time period in seconds
    })
  })
);
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

// TODO: Load routes
app.use("/", authRouter); // Authentication route


// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occurred.");
})

app.get("/", (req, res) => {
  console.log("Hello \"/\"");
  // console.log(req);
  const { userId, username } = req.user;
  console.log(req.isAuthenticated());
  res.send(`User ${username} signed in successfully!`);
  // res.send("User signed in successfully");
});

app.get("/login", (req, res) => {
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