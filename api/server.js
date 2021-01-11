// write the server here and export it
const express = require("express"); // CommonJS
// import express from 'express'
const User = require("./user-model");
const server = express(); // instantiates an express app
server.use(express.json()); // configures the app to read the body of requests
// build a simple endpoint
// [GET] /
server.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

server.get("/api/users", (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: `user with id ${id} not found` });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

server.post("/api/users", async (req, res) => {
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  } else {
    try {
      const newlyCreated = await User.create(user);
      res.status(201).json(newlyCreated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

server.put("/api/users/:id", async (req, res) => {
  const id = re.params.id;
  const changes = req.body;

  if (!changes.name || !changes.bio || changes.adopter_id === undefined) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  } else {
    try {
      const updated = await User.update(id, changes);
      if (!updated) {
        res.status(404).json({ message: `user with id ${id} not found` });
      } else {
        res.status(200).json(updated);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

server.delete("api/users/:id", (req, res) => {
  const { id } = req.params;
  User.delete(id)
    .then((deleted) => {
      if (!deleted) {
        res.status(404).json({ message: `dog with id ${id} not found` });
      } else {
        res.status(200).json(deleted);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});
// export this server so index.js can get it
module.exports = server; // CommonJS syntax
// export default server // ES6 native modules syntax
