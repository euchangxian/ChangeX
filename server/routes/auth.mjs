import "../loadEnvironment.mjs";
import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import db from "../db/conn.mjs";

const router = express.Router();
const users = db.collection("users");

// Passport configuration for sign in
passport.use(
  "login",
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
          console.log(`User ${existingUser.username} logged in successfully`);
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
  "signup",
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

router.post("/login/password", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login"
}));

router.post("/signup", passport.authenticate("signup", {
  successRedirect: "/",
  failureRedirect: "/signup"
}));

router.post("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    console.log("User logged out successfully.");
    res.redirect("/login");
  });
})

export default router;
