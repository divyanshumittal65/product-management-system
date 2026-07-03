const db = require("../config/db");

// Generate Signature
const generateVariantSignature = async (variantId) => {
  const [rows] = await db.query(
    `
    SELECT
      a.name,
      va.value
    FROM variant_attributes va
    JOIN attributes a
      ON va.attribute_id = a.id
    WHERE va.variant_id = ?
    ORDER BY a.name
    `,
    [variantId]
  );

  return rows
    .map((row) => `${row.name}=${row.value}`)
    .join("|");
};

// Create / Update Variant Attribute
const createVariantAttribute = async (req, res) => {
  try {
    const { variant_id, attribute_id, value } = req.body;

    if (!variant_id || !attribute_id || !value) {
      return res.status(400).json({
        message: "variant_id, attribute_id and value are required",
      });
    }

    const [existing] = await db.query(
      `
      SELECT *
      FROM variant_attributes
      WHERE variant_id = ?
      AND attribute_id = ?
      `,
      [variant_id, attribute_id]
    );

    // Update existing value
    if (existing.length > 0) {
      await db.query(
        `
        UPDATE variant_attributes
        SET value = ?
        WHERE variant_id = ?
        AND attribute_id = ?
        `,
        [value, variant_id, attribute_id]
      );
    } else {
      // Insert new value
      await db.query(
        `
        INSERT INTO variant_attributes
        (variant_id, attribute_id, value)
        VALUES (?, ?, ?)
        `,
        [variant_id, attribute_id, value]
      );
    }

    // Generate latest signature
    const signature = await generateVariantSignature(
      variant_id
    );

    // Get product id
    const [variantRows] = await db.query(
      `
      SELECT product_id
      FROM variants
      WHERE id = ?
      `,
      [variant_id]
    );

    const productId = variantRows[0].product_id;

    // Check duplicate combinations
    const [duplicates] = await db.query(
      `
      SELECT id
      FROM variants
      WHERE
        product_id = ?
        AND variant_signature = ?
        AND id <> ?
      `,
      [
        productId,
        signature,
        variant_id,
      ]
    );

    if (duplicates.length > 0) {
      return res.status(400).json({
        message:
          "Duplicate variant combination already exists",
      });
    }

    // Save signature
    await db.query(
      `
      UPDATE variants
      SET variant_signature = ?
      WHERE id = ?
      `,
      [signature, variant_id]
    );

    res.status(200).json({
      message:
        existing.length > 0
          ? "Attribute value updated successfully"
          : "Attribute value saved successfully",
      signature,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Attributes Of Variant
const getVariantAttributes = async (req, res) => {
  try {
    const { variantId } = req.params;

    const [rows] = await db.query(
      `
      SELECT
        va.id,
        va.variant_id,
        va.attribute_id,
        a.name AS attribute_name,
        va.value
      FROM variant_attributes va
      JOIN attributes a
        ON va.attribute_id = a.id
      WHERE va.variant_id = ?
      `,
      [variantId]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Variant Attribute
const deleteVariantAttribute = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `
      DELETE FROM variant_attributes
      WHERE id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Variant attribute not found",
      });
    }

    res.json({
      message: "Variant attribute deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Allowed Attributes For Variant
const getAllowedAttributes = async (req, res) => {
  try {
    const { variantId } = req.params;

    const [rows] = await db.query(
      `
      SELECT
        a.id AS attribute_id,
        a.name AS attribute_name
      FROM variants v
      JOIN products p
        ON v.product_id = p.id
      JOIN type_attributes ta
        ON p.type_id = ta.type_id
      JOIN attributes a
        ON ta.attribute_id = a.id
      WHERE v.id = ?
      `,
      [variantId]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createVariantAttribute,
  getVariantAttributes,
  deleteVariantAttribute,
  getAllowedAttributes,
};