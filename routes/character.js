import express from "express";
import fs from "fs";
import path from "path";
import * as yaml from "js-yaml";
import { resourceUsage } from "process";

const router = express.Router();

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const characters = yaml.load(fs.readFileSync(path.join(__dirname, "../data/character.yaml"), "utf-8"));

// ID一覧
router.get("/", (req, res) => {
  res.json(Object.keys(characters));
});

// ID検索
router.get("/:id", (req, res) => {
  const character = characters[req.params.id];

  if (!character) {
    return res.status(404).json({
      error: "Not found",
    });
  }

  res.json({
    id: req.params.id,
    ...character,
  });
});

export default router;
