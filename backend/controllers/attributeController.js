const db = require("../config/db");

// Create Attribute
exports.createAttribute = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Attribute name is required",
      });
    }

    const [result] = await db.query(
      "INSERT INTO attributes (name) VALUES (?)",
      [name]
    );

    res.status(201).json({
      message: "Attribute created successfully",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Attributes
exports.getAttributes = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM attributes ORDER BY id DESC"
    );

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Attribute
exports.deleteAttribute = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM attributes WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Attribute not found",
      });
    }

    res.status(200).json({
      message: "Attribute deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};