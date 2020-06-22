const express = require("express");
const app = express();
const db = require('./db.js');

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

// TODO user can get users from db
// TODO user can add a user to db
// TODO user can change a user's details in db
// TODO user can delete a user's details from db

app.post("/api/post", (req, res) => {
  const data = req.body;
  if (data.message) {
    res.status(200).json({
      response: `successful POST request`,
      message: data.message,
    });
  } else {
    res.status(400).json({
      response: `bad request`,
    });
  }
});

module.exports = app;
