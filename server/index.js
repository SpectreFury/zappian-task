require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find({});

    const cleanedUsers = users.map((user) => ({
      name: user.name,
      username: user.username,
    }));

    res.json(cleanedUsers);
  } catch (err) {
    res.json({ status: "error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      username: req.body.username,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({
      status: "error",
      error: "Duplicate username",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          username: user.username,
        },
        process.env.JWT_SECRET
      );
      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", user: false });
    }
  } catch (err) {
    res.json({
      status: "error",
      error: "Duplicate username",
    });
  }
});

app.post("/deleteUser", async (req, res) => {
  try {
    await User.deleteOne({
      username: req.body.username,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

app.post("/updateUser", async (req, res) => {
  try {
    await User.updateOne(
      { username: req.body.prevUsername },
      { name: req.body.name, username: req.body.username }
    );
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

app.listen(4000, () => {
  console.log("Running on PORT 4000");
});
