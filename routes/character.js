import express from "express";
import fs from "fs";
import path from "path";
import * as yaml from "js-yaml";
import { resourceUsage } from "process";

const router = express.Router();

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const characterFilePath = path.join(__dirname, "../data/character.yaml");

const characters = yaml.load(fs.readFileSync(characterFilePath, "utf-8"));

// キャラクターの一覧を取得する
// カナ順でソートし、IDと名前のみ返す
router.get("/", (req, res) => {
  const characterEntries = Object.entries(characters);
  characterEntries.sort(([, a], [, b]) => a.name.kana.localeCompare(b.name.kana, "ja"));
  const names = characterEntries.map(([id, character]) => ({ id, name: character.name.ja }));
  res.json(names);
});

// 指定したIDのキャラクター情報を取得する
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

// 新しいキャラクターを追加する
router.post("/", (req, res) => {
  const { id, ...character } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "Missing id",
    });
  }

  if (characters[id]) {
    return res.status(409).json({
      error: "Character already exists",
    });
  }

  characters[id] = character;

  fs.writeFileSync(characterFilePath, yaml.dump(characters, { lineWidth: -1, noRefs: true }), "utf-8");

  res.status(201).json({ id, ...character });
});

export default router;
