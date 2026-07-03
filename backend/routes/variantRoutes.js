const express = require("express");

const router = express.Router();

const {
  createVariant,
  getVariantsByProduct,
  updateVariant,
  deleteVariant,
  getVariantById,
} = require("../controllers/variantController");

router.post("/", createVariant);

router.get("/product/:productId", getVariantsByProduct);
router.get("/:id", getVariantById);
router.put("/:id", updateVariant);
router.delete("/:id", deleteVariant);

module.exports = router;