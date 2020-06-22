const express = require("express");
const app = express();
const db = require("./db.js");
import { Person, Product } from "./types";

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

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

// TODO user can get users from db

app.get("/api/users", (req, res) => {
  db("users")
    .then((users: Person[]) => {
      res.status(200).json(users);
    })

});
// TODO user can add a user to db

app.post("/api/users", (req, res) => {
  const newUser = req.body;
  db("users")
    .insert(newUser)
    .then((id: number) => {
      res.status(200).json({ message: `Created new user`, new_user_id: id });
    })
    .catch((err) => {
      res.status(500).json({ error_message: "Error adding user." });
    });
});

// TODO user can change a user's details in db
app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const updatedDetails = req.body;
  db("users")
    .where({ id })
    .update(updatedDetails)
    .then((rows: number) => {
      res.status(200).json({ message: "User updated", user_id: id })
    })
    .catch((err:any) => {
      res.status(500).json({ error_message: "Error updating user.", err });
    });
})
// TODO user can delete a user's details from db

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db("users")
    .where({ id })
    .del()
    .then((rows: number) => {
      res.status(200).json({ message: "User deleted", user_id: id })
    })
    .catch((err:any) => {
      res.status(500).json({ error_message: "Error deleting user.", err });
    });
})

module.exports = app;
