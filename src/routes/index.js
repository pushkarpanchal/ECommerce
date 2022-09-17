const express = require("express");
const routes = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, check, validationResult } = require("express-validator");

const User = require("../models/User");

//Idiomatic expression in express to route and respond to a client request
routes.get("/", (req, res) => {
  //get requests to the root ("/") will route here
  res.send("index.html"); //server responds by sending the index.html file to the client's browser
  //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

routes.post(
  "/signup",
  [
    check("name", "Name is require").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter password min 6 char").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone_number, userRoll } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exist" });
      }

      user = new User({
        name,
        email,
        phone_number,
        password,
        userRoll,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      // Set password as hash value
      user.password = await bcrypt.hash(password, salt);

      const userData = await user.save();

      const payload = {
        user: {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          userRoll: userData.userRoll,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;

          res.json({
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            userRoll: userData.userRoll,
            token: token,
          });
        }
      );
    } catch (error) {
      console.error("error", error.message);
      res.status(500).send({ msg: "Server errors" });
    }
  }
);

routes.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "User not exist" });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password" });
      }
      const payload = {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          userRoll: user.userRoll,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;

          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            userRoll: user.userRoll,
            token: token,
          });
        }
      );
    } catch (error) {
      console.error("error", error.message);
      res.status(500).send({ msg: "Server errors" });
    }
  }
);

module.exports = routes;
