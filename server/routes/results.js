import express from "express";

import db from "../db/connection.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
    const skip = (page - 1) * 10;

    const collection = await db.collection("results");
    const results = await collection.find({}).sort({ _id: -1 }).skip(skip).limit(10).toArray(); // Sort by newest first

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