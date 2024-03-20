import express from "express";
import cors from "cors";
import results from "./routes/results.js";
import mongoose from 'mongoose'
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({
  origin: 'https://tic-tac-toe-game-kerwin.vercel.app',
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());

mongoose.connect("mongodb+srv://kerwinfelixreyes:Promax0831@cluster0.s82c9fv.mongodb.net/tic_tac_toe")
app.use("/results", results);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});