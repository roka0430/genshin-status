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
  const characterEntries = Object.entries(characters);
  characterEntries.sort(([, a], [, b]) => a.name.kana.localeCompare(b.name.kana, "ja"));
  const names = characterEntries.map(([id, character]) => ({ id, name: character.name.ja }));
  res.json(names);
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
