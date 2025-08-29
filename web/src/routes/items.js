const express = require("express");
const router = express.Router();

// In-memory items for demo (replace with DB later)
const items = new Map();
let idSeq = 1;

router.get("/", (_req, res) => {
  const all = Array.from(items.values());
  res.json({ items: all });
});

router.post("/", (req, res) => {
  const { name } = req.body || {};
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "name is required" });
  }
  const item = { id: idSeq++, name: name.trim(), createdAt: new Date().toISOString() };
  items.set(item.id, item);
  res.status(201).json({ item });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!items.has(id)) return res.status(404).json({ error: "Item not found" });
  res.json({ item: items.get(id) });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!items.has(id)) return res.status(404).json({ error: "Item not found" });
  items.delete(id);
  res.status(204).send();
});

module.exports = router;
