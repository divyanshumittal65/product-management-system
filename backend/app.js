const productRoutes = require("./routes/productRoutes");
const express = require("express");
const cors = require("cors");
const typeRoutes = require("./routes/typeRoute");
const variantRoutes = require("./routes/variantRoutes");
const attributeRoutes = require("./routes/attributeRoutes");
const typeAttributeRoutes = require("./routes/typeAttributeRoutes");
const app = express();
const variantAttributeRoutes = require(
  "./routes/variantAttributeRoutes"
);
app.use(cors());
app.use(express.json());
app.use(
  "/api/variant-attributes",
  variantAttributeRoutes
);
app.use("/api/types", typeRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/type-attributes", typeAttributeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/variants", variantRoutes);
app.get("/", (req, res) => {
  res.send("Product Management API Running");
});

module.exports = app;