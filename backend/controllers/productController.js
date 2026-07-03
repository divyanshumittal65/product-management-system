const db = require("../config/db");

const createProduct = async (req, res) => {
  try {
    const { name, description, type_id } = req.body;

    if (!name || !type_id) {
      return res.status(400).json({
        message: "Name and Type are required",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO products (name, description, type_id)
      VALUES (?, ?, ?)
      `,
      [name, description, type_id]
    );

    res.status(201).json({
      message: "Product created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const getProducts = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        p.*,
        t.name AS type_name
      FROM products p
      JOIN types t
        ON p.type_id = t.id
      ORDER BY p.id DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT * FROM products
      WHERE id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, type_id } = req.body;

    const [result] = await db.query(
      `
      UPDATE products
      SET
        name = ?,
        description = ?,
        type_id = ?
      WHERE id = ?
      `,
      [name, description, type_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `
      DELETE FROM products
      WHERE id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};