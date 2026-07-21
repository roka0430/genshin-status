import express from "express";
import characters from "#modules/characters";

const router = express.Router();

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
