"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var db = require("./db.js");
app.use(express.json());
app.get("/", function (req, res) {
    res.status(200).send("Hello world!");
});
app.post("/api/post", function (req, res) {
    var data = req.body;
    if (data.message) {
        res.status(200).json({
            response: "successful POST request",
            message: data.message
        });
    }
    else {
        res.status(400).json({
            response: "bad request"
        });
    }
});
// TODO user can get users from db
app.get("/api/users", function (req, res) {
    db("users")
        .then(function (users) {
        res.status(200).json(users);
    });
});
// TODO user can add a user to db
app.post("/api/users", function (req, res) {
    var newUser = req.body;
    db("users")
        .insert(newUser)
        .then(function (id) {
        res.status(200).json({ message: "Created new user", new_user_id: id });
    })["catch"](function (err) {
        res.status(500).json({ error_message: "Error adding user." });
    });
});
// TODO user can change a user's details in db
app.put("/api/users/:id", function (req, res) {
    var id = req.params.id;
    var updatedDetails = req.body;
    db("users")
        .where({ id: id })
        .update(updatedDetails)
        .then(function (rows) {
        res.status(200).json({ message: "User updated", user_id: id });
    })["catch"](function (err) {
        res.status(500).json({ error_message: "Error updating user.", err: err });
    });
});
// TODO user can delete a user's details from db
app["delete"]("/api/users/:id", function (req, res) {
    var id = req.params.id;
    db("users")
        .where({ id: id })
        .del()
        .then(function (rows) {
        res.status(200).json({ message: "User deleted", user_id: id });
    })["catch"](function (err) {
        res.status(500).json({ error_message: "Error deleting user.", err: err });
    });
});
module.exports = app;
