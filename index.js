import express from "express";
import { page, character, weapon, preset } from "./routes/index.js";

const app = express();
const PORT = 3001;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.use("/", page);
app.use("/api/character", character);
app.use("/api/weapon", weapon);
app.use("/api/preset", preset);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
