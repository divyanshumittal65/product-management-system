const db = require("../config/db");

// Create Type
exports.createType = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Type name is required",
      });
    }

    const [result] = await db.query(
      "INSERT INTO types (name) VALUES (?)",
      [name]
    );

    res.status(201).json({
      message: "Type created successfully",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Types
exports.getTypes = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM types ORDER BY id DESC"
    );

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Type
exports.deleteType = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM types WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Type not found",
      });
    }

    res.status(200).json({
      message: "Type deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};