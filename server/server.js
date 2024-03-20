import express from "express";
import cors from "cors";
import results from "./routes/results.js";
import http from "http";
import mongoose from "mongoose";
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({
  origin: 'https://tic-tac-toe-game-kerwin.vercel.app',
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());

app.use("/results", results);
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_ATLAS_URL).then(() => {
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((err) => {
  process.exit(1);
});
