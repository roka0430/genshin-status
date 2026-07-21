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
  const character = characters[req.params.id];

  if (!character) {
    return res.status(404).json({
      message: "Character not found",
    });
  }

  res.json(character);
});

export default router;
