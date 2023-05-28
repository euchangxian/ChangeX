import "./loadEnvironment.mjs";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import path from "path";
import { fileURLToPath } from "url";
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

// TODO: Load routes
// status 200 is sent for successful login/signup. 
// status 400 is sent for incorrect username/password.
// status 500 is sent for errors.
app.use(authRoutes);

app.get("/", (req, res) => {
  console.log("Hello \"/\"");
  res.send("/ page");
});

app.get("/login", (req, res) => {
  console.log("Hello login");
  res.send("Log In page");
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