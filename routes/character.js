import express from "express";
import * as yaml from "js-yaml";
import fs from "fs";

const router = express.Router();

const file = fs.readFileSync("./data/characters.yaml", "utf8");
const characters = yaml.load(file);

router.get("/", (req, res) => {
  const charactersEntries = Object.entries(characters);
  const characterList = charactersEntries.map(([id, value]) => {
    return {
      id: id,
      name: value.name.ja,
    };
  });
  res.json(characterList);
});

router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

export default router;
