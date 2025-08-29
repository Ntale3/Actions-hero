const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health");
const helloRoutes = require("./routes/hello");
const echoRoutes = require("./routes/echo");
const itemsRoutes = require("./routes/items");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/health", healthRoutes);
app.use("/api/v1/hello", helloRoutes);
app.use("/api/v1/echo", echoRoutes);
app.use("/api/v1/items", itemsRoutes);

// 404 handler
app.use((res, _next) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

module.exports = app;
