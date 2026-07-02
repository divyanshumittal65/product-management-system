const express = require("express");

const router = express.Router();

const {
  createAttribute,
  getAttributes,
  deleteAttribute,
} = require("../controllers/attributeController");

router.post("/", createAttribute);
router.get("/", getAttributes);
router.delete("/:id", deleteAttribute);

module.exports = router;