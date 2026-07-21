import express from "express";
import { page, character } from "./routes/index.js";

const app = express();
const PORT = 3001;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.use("/", page);
app.use("/api/character", character);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
