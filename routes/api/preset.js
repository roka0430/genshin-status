import express from "express";
import presets from "#modules/presets";

const router = express.Router();

router.get("/", (req, res) => {
  const presetsEntries = Object.entries(presets);
  const presetList = presetsEntries.map(([id, value]) => {
    return {
      id: Number(id),
      name: value.name,
    };
  });
  res.json(presetList);
});

router.get("/:id", (req, res) => {
  const preset = presets[req.params.id];

  if (!preset) {
    return res.status(404).json({
      message: "Preset not found",
    });
  }

  res.json(preset);
});

export default router;
