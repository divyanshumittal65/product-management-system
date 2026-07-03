const db = require("../config/db");

// Create Variant
const createVariant = async (req, res) => {
  try {
    const { product_id, sku, price, stock } = req.body;

    if (!product_id || !sku || price === undefined) {
      return res.status(400).json({
        message: "Product, SKU and Price are required",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO variants
      (product_id, sku, price, stock)
      VALUES (?, ?, ?, ?)
      `,
      [product_id, sku, price, stock || 0]
    );

    res.status(201).json({
      message: "Variant created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        message: "SKU already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};
const getVariantById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM variants WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Variant not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Variants By Product
const getVariantsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const [rows] = await db.query(
      `
      SELECT *
      FROM variants
      WHERE product_id = ?
      ORDER BY id DESC
      `,
      [productId]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Variant
const updateVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, sku, price, stock } = req.body;

    const [result] = await db.query(
      `
      UPDATE variants
      SET
        product_id = ?,
        sku = ?,
        price = ?,
        stock = ?
      WHERE id = ?
      `,
      [product_id, sku, price, stock, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Variant not found",
      });
    }

    res.json({
      message: "Variant updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Variant
const deleteVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `
      DELETE FROM variants
      WHERE id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Variant not found",
      });
    }

    res.json({
      message: "Variant deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createVariant,
  getVariantsByProduct,
  updateVariant,
  deleteVariant,
  getVariantById,
};