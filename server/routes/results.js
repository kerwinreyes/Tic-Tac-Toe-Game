import express from "express";

import db from "../db/connection.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("results");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.post("/", async (req, res) => {
  try {
    let newDocument = {
      player1: req.body.player1,
      player2: req.body.player2,
      score1: req.body.score1,
      score2: req.body.score2,
    };
    let collection = await db.collection("results");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    res.status(500).send("Error saving record");
  }
});

export default router;