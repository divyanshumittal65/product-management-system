const db = require("../config/db");

// Add Image
const createVariantImage = async (req, res) => {
  try {
    const { variant_id, image_url } = req.body;

    if (!variant_id || !image_url) {
      return res.status(400).json({
        message: "Variant ID and Image URL are required",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO variant_images
      (variant_id, image_url)
      VALUES (?, ?)
      `,
      [variant_id, image_url]
    );

    res.status(201).json({
      message: "Image added successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Images By Variant
const getImagesByVariant = async (req, res) => {
  try {
    const { variantId } = req.params;

    const [rows] = await db.query(
      `
      SELECT *
      FROM variant_images
      WHERE variant_id = ?
      ORDER BY id DESC
      `,
      [variantId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Image
const getVariantImageById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT *
      FROM variant_images
      WHERE id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Image
const updateVariantImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image_url } = req.body;

    if (!image_url) {
      return res.status(400).json({
        message: "Image URL is required",
      });
    }

    const [result] = await db.query(
      `
      UPDATE variant_images
      SET image_url = ?
      WHERE id = ?
      `,
      [image_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    res.status(200).json({
      message: "Image updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Image
const deleteVariantImage = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `
      DELETE FROM variant_images
      WHERE id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    res.status(200).json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createVariantImage,
  getImagesByVariant,
  getVariantImageById,
  updateVariantImage,
  deleteVariantImage,
};