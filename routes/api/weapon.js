import express from "express";
import weapons from "#modules/weapons";

const router = express.Router();

router.get("/", (req, res) => {
  const weaponEntries = Object.entries(weapons);
  const weaponList = weaponEntries.map(([id, value]) => {
    return {
      id: id,
      name: value.name.ja,
    };
  });
  res.json(weaponList);
});

router.get("/:id", (req, res) => {
  const weapon = weapons[req.params.id];

  if (!weapon) {
    return res.status(404).json({
      message: "Weapon not found",
    });
  }

  res.json(weapon);
});

export default router;
