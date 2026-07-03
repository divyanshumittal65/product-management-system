import { useEffect, useState } from "react";
import api from "../services/api";
import Variants from "./Variants";

interface Product {
  id: number;
  name: string;
  description: string;
  type_id: number;
  type_name: string;
}

interface Type {
  id: number;
  name: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [types, setTypes] = useState<Type[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typeId, setTypeId] = useState("");

  const [editingId, setEditingId] = useState<number | null>(
    null
  );

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTypes = async () => {
    try {
      const res = await api.get("/types");
      setTypes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchTypes();
  }, []);

  const handleSubmit = async () => {
    try {
      const payload = {
        name,
        description,
        type_id: Number(typeId),
      };

      if (editingId) {
        await api.put(
          `/products/${editingId}`,
          payload
        );
      } else {
        await api.post("/products", payload);
      }

      setName("");
      setDescription("");
      setTypeId("");
      setEditingId(null);

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setDescription(product.description);
    setTypeId(product.type_id.toString());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br />
      <br />

      <select
        value={typeId}
        onChange={(e) =>
          setTypeId(e.target.value)
        }
      >
        <option value="">
          Select Product Type
        </option>

        {types.map((type) => (
          <option
            key={type.id}
            value={type.id}
          >
            {type.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button onClick={handleSubmit}>
        {editingId
          ? "Update Product"
          : "Add Product"}
      </button>

      <hr />

      <table border={1}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.type_name}</td>
              <td>{product.description}</td>

              <td>
                <button
                  onClick={() =>
                    handleEdit(product)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(product.id)
                  }
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    setSelectedProduct(
                      selectedProduct?.id === product.id ? null : product
                    )
                  }
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {selectedProduct?.id === product.id ? "Hide Variants" : "Variants"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <Variants
          productId={selectedProduct.id}
          productName={selectedProduct.name}
        />
      )}
    </div>
  );
}

export default Products;