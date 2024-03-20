import express from "express";
import cors from "cors";
import results from "./routes/results.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({
  origin: 'https://tic-tac-toe-game-kerwin.vercel.app'
}));
app.use(express.json());
app.use("/results", results);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});