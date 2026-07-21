import express from "express";
import character from "./routes/character.js";

const app = express();
const PORT = 3001;

app.set("view engine", "ejs");
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/character", character);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
