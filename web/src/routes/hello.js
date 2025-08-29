const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const name = (req.query.name || "world").toString();
  res.json({ message: `Hello, ${name}!` });
});

module.exports = router;
