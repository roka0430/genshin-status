import express from "express";
import path from "path";
import characterRouter from "./routes/character.js";

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const app = express();
const PORT = 3001;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/character", characterRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
