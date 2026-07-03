const express = require("express");

const router = express.Router();

const {
  createVariantAttribute,
  getVariantAttributes,
  deleteVariantAttribute,
  getAllowedAttributes,
} = require("../controllers/variantAttributeController");

router.post("/", createVariantAttribute);

router.get("/allowed/:variantId", getAllowedAttributes);

router.get("/:variantId", getVariantAttributes);

router.delete("/:id", deleteVariantAttribute);

module.exports = router;