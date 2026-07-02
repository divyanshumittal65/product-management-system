const express = require("express");
const cors = require("cors");
const typeRoutes = require("./routes/typeRoute");
const attributeRoutes = require("./routes/attributeRoutes");
const typeAttributeRoutes = require("./routes/typeAttributeRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/types", typeRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/type-attributes", typeAttributeRoutes);
app.get("/", (req, res) => {
  res.send("Product Management API Running");
});

module.exports = app;