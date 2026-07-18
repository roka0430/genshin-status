import express from "express";
import path from "path";

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
