import express from "express";
import path from "path";
import characterRouter from "./routes/character.js";

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/character", characterRouter);

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
