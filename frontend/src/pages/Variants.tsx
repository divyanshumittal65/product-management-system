import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import VariantImages from "./VariantImages";
import api from "../services/api";
import VariantAttributes from "./VariantAttributes";
interface Variant {
  id: number;
  product_id: number;
  sku: string;
  price: number;
  stock: number;
}

interface VariantsProps {
  productId: number;
  productName: string;
}

function Variants({ productId, productName }: VariantsProps) {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariantId, setSelectedVariantId] =
  useState<number | null>(null);

const [selectedSku, setSelectedSku] =
  useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchVariants();
  }, [productId]);

  const fetchVariants = async () => {
    try {
      const res = await api.get(
        `/variants/product/${productId}`
      );
      setVariants(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!sku || !price) return;

    const payload = {
      product_id: productId,
      sku,
      price: Number(price),
      stock: Number(stock),
    };

    try {
      if (editingId) {
        await api.put(`/variants/${editingId}`, payload);
      } else {
        await api.post("/variants", payload);
      }

      setSku("");
      setPrice("");
      setStock("");
      setEditingId(null);

      fetchVariants();
    } catch (error: any) {
  console.error(error);

  toast.error(
    error?.response?.data?.message ||
    "Something went wrong"
  );
}
  };

  const handleEdit = (variant: Variant) => {
    setEditingId(variant.id);
    setSku(variant.sku);
    setPrice(String(variant.price));
    setStock(String(variant.stock));
  };
  const [selectedImageVariantId, setSelectedImageVariantId] =
  useState<number | null>(null);

const [selectedImageSku, setSelectedImageSku] =
  useState("");
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/variants/${id}`);
      fetchVariants();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "10px", marginTop: "10px", border: "1px solid #555" }}>
      <h3>Variants for: {productName}</h3>

      <input
        type="text"
        placeholder="SKU"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
      />
      {" "}
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {" "}
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      {" "}
      <button onClick={handleSubmit}>
        {editingId ? "Update Variant" : "Add Variant"}
      </button>

      <table border={1} style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {variants.map((variant, index) => (
            <tr key={variant.id}>
              <td>{index + 1}</td>
              <td>{variant.sku}</td>
              <td>{variant.price}</td>
              <td>{variant.stock}</td>
              <td>
                <button onClick={() => handleEdit(variant)}>
                  Edit
                </button>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleDelete(variant.id)}
                >
                  Delete
                </button>
                <button
  style={{ marginLeft: "10px" }}
  onClick={() => {
    if (
      selectedImageVariantId === variant.id
    ) {
      setSelectedImageVariantId(null);
      return;
    }

    setSelectedImageVariantId(
      variant.id
    );

    setSelectedImageSku(
      variant.sku
    );
  }}
>
  Images
</button>
                <button
  style={{ marginLeft: "10px" }}
  onClick={() => {
    if (selectedVariantId === variant.id) {
      setSelectedVariantId(null);
      return;
    }

    setSelectedVariantId(variant.id);
    setSelectedSku(variant.sku);
  }}
>
  Attributes
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedImageVariantId && (
  <VariantImages
    variantId={selectedImageVariantId}
    sku={selectedImageSku}
  />
)}
      {selectedVariantId && (
  <VariantAttributes
    variantId={selectedVariantId}
    sku={selectedSku}
  />
)}
    </div>
  );
}

export default Variants;