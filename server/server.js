import express from "express";
import cors from "cors";
import results from "./routes/results.js";
import http from 'http'
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
  origin: ['https://tic-tac-toe-game-kerwin.vercel.app'],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());

app.use("/results", results);
app.get("/", (req, res) => {
  res.json("Hello");
}) 

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});