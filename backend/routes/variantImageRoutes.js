const express = require("express");

const router = express.Router();

const {
  createVariantImage,
  getImagesByVariant,
  getVariantImageById,
  updateVariantImage,
  deleteVariantImage,
} = require("../controllers/variantImageController");

router.post("/", createVariantImage);

router.get("/variant/:variantId", getImagesByVariant);

router.get("/:id", getVariantImageById);

router.put("/:id", updateVariantImage);

router.delete("/:id", deleteVariantImage);

module.exports = router;