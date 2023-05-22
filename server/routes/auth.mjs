import express from "express";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import db from "../db/conn.mjs";

const router = express.Router();

// Configure the local strategy.
passport.use(
  new LocalStrategy((email, password, done) => {
    try {
      // Find the user in the users Collection
      const user = db.users.findOne({ email: email });

      // If user not found, return error
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }

      // Compare the password using bcrypt
      const isMatch = bcrypt.compare(password, user.password);

      // If password is not a match, return error
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      // If authentication succeeds, return the user
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

router.post("/signin/password", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/signin"
}));
