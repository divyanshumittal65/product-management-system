const express = require("express");

const router = express.Router();

const {
  createMapping,
  getMappingsByType,
  deleteMapping,
} = require("../controllers/typeAttributeController");

router.post("/", createMapping);
router.get("/:typeId", getMappingsByType);
router.delete("/:id", deleteMapping);

module.exports = router;