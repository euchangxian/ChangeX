import "../loadEnvironment.mjs";
import express from "express";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import db from "../db/conn.mjs";
import MongoStore from "connect-mongo";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const users = db.collection("users");

router.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "public")));

router.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: MongoStore.create({
      mongoUrl: process.env.ATLAS_URI,
      touchAfter: 24 * 3600 // time period in seconds
    }),
    cookie: {
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Sets the expiration date to 1 day from now
      maxAge: 24 * 60 * 60 * 1000 // Sets the maximum age of the cookie to 1 day
    }
  })
);
router.use(passport.initialize());
router.use(passport.authenticate("session"));

// Passport configuration for sign in
passport.use(
  "signIn",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async (username, password, done) => {
      // Find the user in the users Collection
      users.findOne({ username: username }).then(existingUser => {
        // If user not found, return error
        if (!existingUser) {
          return done(null, false, { message: "Incorrect username." });
        }
        // Compare the password using bcrypt
        bcrypt.compare(password, existingUser.password, (err, isMatch) => {
          // If password is not a match, return error
          if (!isMatch) {
            console.log("Incorrect password");
            return done(null, false, { message: "Incorrect password." });
          }
          // If password is a match, return the existing user.
          console.log(`User ${existingUser.username} signed in successfully`);
          return done(null, existingUser);
        });
      }).catch(error => {
        console.log(error);
        return done(err);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user._id, username: user.username });
  })
});

passport.deserializeUser((user, done) => {
  process.nextTick(() => {
    done(null, user);
  })
});

const saltRounds = 10;
// Passport configuration for sign ups
passport.use(
  "signUp",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    async (req, username, password, done) => {
      // Check if user already exists with the form's username
      users.findOne({ username: username }).then(existingUser => {
        if (existingUser) {
          return done(null, false, { message: "Username is already taken!" });
        }
      });
      // If there is no existing users with that username, hash password and insert into the users collection
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
          return done(err);
        }
        const newUser = {
          username: username,
          password: hash
        };
        users.insertOne(newUser).then(result => {
          console.log(result);
          users.findOne(newUser).then(user => {
            console.log(`User ${user.username} successfully inserted into users collection`);
          });
          return done(null, result);
        }).catch(err => {
          console.log(err);
          return done(err);
        });
      })
    }
  )
);

router.post("/signin/password", passport.authenticate("signIn", {
  successRedirect: "/",
  failureRedirect: "/"
}));

router.post("/signup", passport.authenticate("signUp", {
  successRedirect: "/",
  failureRedirect: "/"
}));

export default router;
