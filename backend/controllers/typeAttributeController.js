const db = require("../config/db");

// Create Mapping
exports.createMapping = async (req, res) => {
  try {
    const { type_id, attribute_id } = req.body;

    if (!type_id || !attribute_id) {
      return res.status(400).json({
        message: "type_id and attribute_id are required",
      });
    }

    const [existing] = await db.query(
      `SELECT * FROM type_attributes
       WHERE type_id = ? AND attribute_id = ?`,
      [type_id, attribute_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Mapping already exists",
      });
    }

    const [result] = await db.query(
      `INSERT INTO type_attributes
       (type_id, attribute_id)
       VALUES (?, ?)`,
      [type_id, attribute_id]
    );

    res.status(201).json({
      message: "Mapping created successfully",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Mappings By Type
exports.getMappingsByType = async (req, res) => {
  try {
    const { typeId } = req.params;

    const [rows] = await db.query(
      `SELECT
          ta.id,
          a.id AS attribute_id,
          a.name AS attribute_name
       FROM type_attributes ta
       JOIN attributes a
         ON ta.attribute_id = a.id
       WHERE ta.type_id = ?`,
      [typeId]
    );

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Mapping
exports.deleteMapping = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM type_attributes WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Mapping not found",
      });
    }

    res.status(200).json({
      message: "Mapping deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};