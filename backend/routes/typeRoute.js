const express = require("express");

const router = express.Router();

const {
  createType,
  getTypes,
  deleteType,
} = require("../controllers/typeController");

router.post("/", createType);
router.get("/", getTypes);
router.delete("/:id", deleteType);

module.exports = router;